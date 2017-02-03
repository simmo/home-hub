const ExtractTextPlugin = require('extract-text-webpack-plugin')
const path = require('path')
const webpack = require('webpack')
const StyleLintPlugin = require('stylelint-webpack-plugin')
const CircularDependencyPlugin = require('circular-dependency-plugin')

const is = {
    js: /\.js$/,
    nodeModules: /node_modules/,
    scss: /\.scss$/,
    svg: /\.svg$/,
    production: process.env.NODE_ENV === 'production'
}

var config = {
    entry: {
        app: [
            './client/app'
        ]
    },
    output: {
        path: path.resolve('public'),
        filename: '[name].js'
    },
    module: {
        rules: [
            {
                test: is.js,
                exclude: [is.nodeModules],
                enforce: 'pre',
                use: 'eslint-loader'
            },
            {
                test: is.js,
                exclude: [is.nodeModules],
                use: 'babel-loader'
            },
            {
                test: is.scss,
                exclude: [is.nodeModules],
                loader: ExtractTextPlugin.extract({
                    fallbackLoader: 'style-loader',
                    loader: [
                        {
                            loader: 'css-loader',
                            query: {
                                modules: false,
                                sourceMaps: true
                            }
                        },
                        'postcss-loader',
                        {
                            loader: 'sass-loader',
                            query: {
                                includePaths: [path.resolve(__dirname, './client')]
                            }
                        }
                    ]
                })
            },
            {
                test: is.svg,
                exclude: [is.nodeModules],
                use: ['babel-loader', 'react-svg-loader']
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin({
            filename: '[name].css'
        }),
        new StyleLintPlugin({
            failAfterError: false,
            quiet: true
        }),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
            '__DEV__': JSON.stringify(!is.production),
            '__RELEASE__': JSON.stringify(process.env.RELEASE || 'N/A')
        }),
        new CircularDependencyPlugin({
            failOnError: true
        })
    ],
    stats: {
        children: false,
        hash: false,
        version: false
    },
    resolve: {
        extensions: ['.svg', '.scss', '.webpack.js', '.web.js', '.js'],
        modules: ['node_modules', 'client', 'public']
    }
}

// If production build
if (is.production) {
    config.plugins.push(
        new webpack.optimize.UglifyJsPlugin({
            sourceMap: true
        })
    )
}

module.exports = config
