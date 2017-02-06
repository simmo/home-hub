const moment = require('moment')
const chalk = require('chalk')
const prettyBytes = require('pretty-bytes')
const table = require('text-table')

function BetterLogger() {}

BetterLogger.prototype.apply = function(compiler) {
    compiler.plugin('done', (stats) => {
        const data = stats.toJson()
        const buildTime = moment.duration(data.time)
        const buildDuration = [
            buildTime.minutes() && buildTime.minutes() + 'm',
            buildTime.seconds() && buildTime.seconds() + 's',
            buildTime.milliseconds() && buildTime.milliseconds() + 'ms'
        ].filter(seg => seg !== 0).join(' ')
        const assets = data.assets.map(asset => {
            const fileName = asset.emitted ? chalk.green(asset.name) : chalk.red(asset.name)
            const fileSize = prettyBytes(asset.size)

            return [fileName, asset.isOverSizeLimit ? chalk.red.bold(fileSize) : fileSize, asset.isOverSizeLimit ? chalk.red.bold('Large file') : 'None']
        })

        assets.unshift([chalk.bold('Name'), chalk.bold('Size'), chalk.bold('Comments')])

        console.log(table(assets, {
            align: [ 'l', 'l' ],
            stringLength: (string) => chalk.stripColor(string).length
        }))

        console.log(`\nBuilt in ${chalk.magenta.bold(buildDuration)}.`)

        if (data.errors.length) {
            data.errors.forEach(error => console.error('\n' + error))
        }

        if (data.warnings.length) {
            data.warnings.forEach(warning => console.warn('\n' + warning))
        }

        console.log(chalk.dim('\nComplete.\n\n'))
    })
}

module.exports = BetterLogger
