const webpackMerge = require('webpack-merge');
const commonConfiguration = require('./common');
const webpack = require('webpack');
const uglifyJSPlugin = require('uglifyjs-webpack-plugin');
const DuplicatePackageCheckerPlugin = require("duplicate-package-checker-webpack-plugin");
const WebpackMonitor = require('webpack-monitor');

module.exports = webpackMerge(commonConfiguration, {
    mode: 'production',
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('production')
            }
        }),
        new DuplicatePackageCheckerPlugin(),
        new WebpackMonitor({
            capture: true,
            launch: true,
        })
    ],
    entry: {
        index: './src/index.js'
    },
    output: {
        path: __dirname + '/dist',
        filename: 'bundle.js'
    },
    optimization: {
        minimizer: [
            new uglifyJSPlugin({
                parallel: true,
                uglifyOptions: {
                    compress: {
                        drop_console: true,
                    }
                }
            })
        ]
    },
    module: {
        rules: [
            {
                test: /\.(png|jpg|gif)$/,
                loader: 'image-webpack-loader',
                enforce: 'pre',
            },
            {
                test: /\.(png|jpg|gif)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 500
                        }
                    }
                ]
            }
        ]
    }
});