const webpackMerge = require('webpack-merge');
const commonConfiguration = require('./common');
const webpack = require('webpack');
const uglifyJSPlugin = require('uglifyjs-webpack-plugin');
const DuplicatePackageCheckerPlugin = require("duplicate-package-checker-webpack-plugin");
require('url-loader');
const path = require('path');
const CompressionPlugin = require("compression-webpack-plugin");
const purifyCSSPlugin = require("purifycss-webpack");
const glob = require("glob-all");
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

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
    pluginList.push(new purifyCSSPlugin({
        paths: glob.sync([
            path.join(__dirname, "src/**/*.cshtml"),
            path.join(__dirname, "src/**/*.html"),
            path.join(__dirname, "src/**/*.js")
        ]),
        purifyOptions:{
            whitelist: ['*mod*']
        }
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
            path: path.resolve('./dist'),
            filename: 'bundle.js'
        },
        optimization: {
            minimizer: [
                new uglifyJSPlugin({
                    parallel: true,
                    cache: true,
                    uglifyOptions: {
                        compress: {
                            drop_console: true,
                        },
                    },
                }),
                new OptimizeCSSAssetsPlugin({})
            ],
            splitChunks: {
                cacheGroups: {
                    default: false,
                    commons: {
                        name: 'commons',
                        chunks: 'all',
                        minChunks: 3,
                        enforce: true
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
        }
    });
};
