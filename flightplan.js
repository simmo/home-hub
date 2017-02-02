const path              = require('path')
const plan              = require('flightplan')
const config            = require('./config')

const application       = 'home-hub'
const deployTo          = path.join('/var', 'www', application)
const repoUrl           = 'https://github.com/simmo/home-hub.git'
const branch            = 'master'
const keepReleases      = 3
const releaseTimestamp  = new Date().getTime().toString()
const releasesPath      = path.join(deployTo, 'releases')
const sharedPath        = path.join(deployTo, 'shared')
const repoPath          = path.join(deployTo, 'repo')
const logsPath          = path.join(deployTo, 'logs')
const currentPath       = path.join(deployTo, 'current')
const deploymentLogPath = path.join(logsPath, 'deployments.log')
const releasePath       = path.join(releasesPath, releaseTimestamp)
const linkedDirs        = []
const linkedFiles       = ['config.json', 'ecosystem.json']

var revision            = null
var localUser           = null
var tag                 = null

var envs = {
    production: {
        host: config.production.host,
        username: config.production.user,
        password: config.production.password
    }
}

var deploy = {
    prep: (transport) => {
        localUser = transport.exec('whoami').stdout.trim()
    },
    check: (transport) => {
        transport.with({ exec: { pty: true } }, () => {

            transport.log('Checking environment...')
            transport.silent()

            // 1) Check git and yarn are installed
            transport.exec('which git')
            transport.exec('which yarn')
            transport.exec('which pm2')

            // 2) Check remote repo exists
            transport.exec(`git ls-remote --heads ${repoUrl}`)

            // 3) Check releases and shared directories exist
            transport.sudo(`mkdir -p ${releasesPath} ${sharedPath} ${logsPath}`)

            // 4) Check shared directories exist
            if (linkedDirs.length) {
                var dirs = linkedDirs.map(dir => path.join(sharedPath, dir)).join()

                transport.sudo(`mkdir -p ${dirs}`)
            }
            if (linkedFiles.length) {
                var files = linkedFiles.map(file => path.join(sharedPath, file)).join(' ')

                transport.sudo(`touch ${files}`)
            }

            // 5) Check we have a repo
            if (transport.exec(`[ -f ${path.join(repoPath, 'HEAD')} ]`, { failsafe: true }).code === 0) {
                // Yes: Update
                transport.with(`cd ${repoPath}`, () => {
                    transport.sudo('git remote update')
                })
            } else {
                // No: Clone
                transport.sudo(`git clone --mirror ${repoUrl} ${repoPath}`)
            }

            // 6) Check we have write permissions
            // @todo

        })
    },
    create: (transport) => {
        transport.with({ exec: { pty: true } }, () => {

            transport.log('Creating release...')
            transport.silent()

            // 1) Create release folder
            transport.debug('Create release directory')
            transport.sudo(`mkdir -p ${releasePath}`)

            // 2) Bundle repo, copy to release and uncompress contents
            transport.sudo(`git -C ${repoPath} archive ${branch} | tar -x -f - -C ${releasePath}`)

            // 3) Make sure we have a shared logs directory
            transport.sudo(`mkdir -p ${sharedPath}/logs`)

            // 4) Create symlinked directories and files
            if (linkedDirs.length) {
                var dirs = linkedDirs.map(dir => path.join(releasePath, dir)).join()

                transport.sudo(`mkdir -p ${dirs}`)

                linkedDirs.forEach(dir => {
                    var target = path.join(releasePath, dir)
                    var source = path.join(sharedPath, dir)

                    if (transport.exec(`[ -d ${target} ]`, { failsafe: true }).code === 0) {
                        transport.sudo(`rm -rf ${target}`)
                    }

                    transport.sudo(`ln -s ${source} ${target}`)
                })
            }
            if (linkedFiles.length) {
                linkedFiles.forEach(file => {
                    const target = path.join(releasePath, file)
                    const source = path.join(sharedPath, file)

                    // if (transport.exec(`[ -d ${target} ]`, { failsafe: true }).code === 0) {
                    //     transport.sudo(`rm -rf ${target}`)
                    // }

                    transport.sudo(`ln -s ${source} ${target}`)
                })
            }

            // 5) Fetch revision number
            transport.with(`cd ${repoPath}`, () => {
                const fetchReleaseSha = transport.exec(`git rev-list --max-count=1 --abbrev-commit --abbrev=12 ${branch}`)

                revision = fetchReleaseSha.code === 0 ? fetchReleaseSha.stdout.trim() : 'unknown'
                tag = transport.exec('git describe --abbrev=0').stdout.trim()
            })

            // 6) Run npm install and build
            // transport.verbose()
            transport.with(`cd ${releasePath}; export REVISION=${tag}; export NODE_ENV=${transport._context.target}`, () => {
                transport.sudo('yarn install')
                transport.sudo('yarn run build')
            })

        })
    },
    publish: (transport) => {
        transport.with({ exec: { pty: true } }, () => {

            transport.log('Publishing release...')
            transport.silent()

            // 1) Update current symlink to new release
            transport.sudo(`ln -sfn ${releasePath} ${currentPath}`)

            // 2) Update log
            transport.sudo(`printf "[%s %s] Branch %s (at %s) deployed as release %s by %s\n" $(date '+%Y-%m-%d %H:%M:%S') "${branch}" "${revision}" "${releaseTimestamp}" "${localUser}" >> ${deploymentLogPath}`)

        })
    },
    restart: (transport) => {
        // 1) Restart node process
        transport.with(`export NODE_ENV=${transport._context.target}`, { exec: { pty: true } }, () => {
            transport.sudo(`pm2 startOrRestart ${sharedPath}/ecosystem.json --env production`)
        })
    },
    cleanup: (transport) => {
        transport.with({ exec: { pty: true } }, () => {

            transport.log('Cleaning up old releases...')
            transport.silent()

            // 1) Only remove the number of releases specified by keepReleases
            var fetchReleases = transport.sudo(`ls -r ${releasesPath}`)

            if (fetchReleases.code === 0) {
                var releases = fetchReleases.stdout.trim().split('\n').slice(keepReleases)

                if (releases.length) {
                    transport.log(`Removing ${releases.length} release(s)...`)
                    transport.with(`cd ${releasesPath}`, () => transport.sudo(`rm -rf ${releases.join(' ')}`))
                }
            }

        })
    },
    rollback: (transport) => {
        transport.with({ exec: { pty: true } }, () => {

            transport.log('Rolling back to previous release...')
            transport.silent()

            var fetchReleases = transport.exec(`ls -r ${releasesPath}`)
            var releases = fetchReleases.stdout.trim().split('\n')
            var currentReleasePath = transport.exec(`readlink -f ${currentPath}`).stdout.trim()
            var currentReleaseDir = path.basename(currentReleasePath)
            var release = releases[releases.indexOf(currentReleaseDir) + 1]
            var previousRelease = path.join(releasesPath, release)

            // If we have a previous release
            if (previousRelease) {
                console.log(releases)
                console.log(currentReleasePath)

                // 1) Point current synlink to previous release
                transport.log(`ln -sfn ${previousRelease} ${currentPath}`)

                // 2) Update log
                transport.log(`printf "[%s %s] %{%s} rolled back to release %{release}\n" $(date '+%Y-%m-%d %H:%M:%S') "${localUser}" "${release}" >> ${deploymentLogPath}`)
            }

        })
    }
}

plan.target('production', envs.production, { debug: true })

plan.local('deploy', deploy.prep)
plan.remote('deploy', deploy.check)
plan.remote('deploy', deploy.create)
plan.remote('deploy', deploy.publish)
plan.remote('deploy', deploy.restart)
plan.remote('deploy', deploy.cleanup)

plan.local('rollback', deploy.prep)
plan.remote('rollback', deploy.rollback)
plan.remote('rollback', deploy.restart)
