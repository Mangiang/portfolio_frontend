const webpackMerge = require('webpack-merge');
const commonConfiguration = require('./common');
const webpack = require('webpack');
const uglifyJSPlugin = require('uglifyjs-webpack-plugin');
const DuplicatePackageCheckerPlugin = require("duplicate-package-checker-webpack-plugin");
require('image-webpack-loader');
require('url-loader');
const path = require('path');
const CompressionPlugin = require("compression-webpack-plugin");

module.exports = env => {
    const pluginList = [];
    // noinspection JSUnresolvedFunction
    pluginList.push(new webpack.DefinePlugin({'process.env.NODE_ENV': JSON.stringify('production')}));
    pluginList.push(new DuplicatePackageCheckerPlugin());
    pluginList.push(new CompressionPlugin({
        asset: '[path].gz[query]',
        algorithm: 'gzip',
        test: /\.js$|\.css$|\.html$/,
        threshold: 10240,
        minRatio: 0.8
    }));

    if (!env || env.PROD_ENV !== "headless") {
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
            index: path.resolve('./src/index.js')
        },
        output: {
            path: __dirname + '../../../dist',
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
            ],
            splitChunks: {
                cacheGroups: {
                    default: false,
                    commons: {
                        test: /[\\/]node_modules[\\/]/,
                        name: 'vendor_app',
                        chunks: 'all',
                        minChunks: 2
                    },
                    styles: {
                        name: 'styles',
                        test: /\.css$/,
                        chunks: 'all',
                        enforce: true
                    }
                }
            },
            runtimeChunk: true
        },
        module: {
            rules: [
                {
                    test: /\.(png|jpg|gif)$/,
                    loader: 'image-webpack-loader',
                    enforce: 'pre',
                }
            ]
        }
    });
};
