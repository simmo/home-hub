const autoprefixer = require('autoprefixer')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const path = require('path')
const webpack = require('webpack')
const StyleLintPlugin = require('stylelint-webpack-plugin')

const is = {
    js: /\.js$/,
    nodeModules: /node_modules/,
    scss: /\.scss$/,
    svg: /\.svg$/,
    production: process.env.NODE_ENV === 'production'
}

var config = {
    entry: {
        app: ['./client/app']
    },
    output: {
        path: path.resolve('public'),
        filename: '[name].js'
    },
    module: {
        preLoaders: [
            {
                test: is.js,
                exclude: [is.nodeModules],
                loader: 'eslint'
            }
        ],
        loaders: [
            {
                test: is.js,
                exclude: [is.nodeModules],
                loader: 'babel'
            },
            {
                test: is.scss,
                exclude: [is.nodeModules],
                loader: ExtractTextPlugin.extract('style', 'css!postcss!sass?&includePaths[]=' + path.resolve(__dirname, './client'))
            },
            {
                test: is.svg,
                exclude: [is.nodeModules],
                loaders: ['babel', 'react-svg']
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin('[name].css'),
        new StyleLintPlugin({
            failAfterError: false,
            quiet: true
        }),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
            '__DEV__': JSON.stringify(!is.production),
            '__RELEASE__': JSON.stringify(process.env.RELEASE || 'N/A')
        })
    ],
    postcss: [
        autoprefixer({
            browsers: ['last 2 versions']
        })
    ],
    stats: {
        children: false,
        hash: false,
        version: false
    },
    resolve: {
        extensions: ['', '.svg', '.scss', '.webpack.js', '.web.js', '.js'],
        modulesDirectories: ['client', 'node_modules', 'public']
    }
}

// If production build
if (is.production) {
    config.plugins.push(
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        })
    )
}

module.exports = config
