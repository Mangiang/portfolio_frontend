const webpackMerge = require('webpack-merge');
const commonConfiguration = require('./common');
const webpack = require('webpack');
const uglifyJSPlugin = require('uglifyjs-webpack-plugin');
const DuplicatePackageCheckerPlugin = require("duplicate-package-checker-webpack-plugin");
const imageLoader = require('image-webpack-loader');
const urlLoader = require('url-loader');


module.exports = env => {
    const pluginList = [];
    pluginList.push(
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('production')
            }
        })
    );
    pluginList.push(
        new DuplicatePackageCheckerPlugin()
    );

    if (env.PROD_ENV !== "headless") {
        const WebpackMonitor = require('webpack-monitor');
        pluginList.push(
            new WebpackMonitor({
                capture: true,
                launch: true,
            })
        );
    }

    return webpackMerge(commonConfiguration, {
        mode: 'production',
        plugins: [...pluginList],
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
};