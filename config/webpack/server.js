const webpackMerge = require('webpack-merge');
const commonConfiguration = require('./common');

module.exports = env => {
    let devServ = {overlay: true, open: false};
    if (!env || env.PROD_ENV !== "headless") {
        devServ = {overlay: true, open: true};
    }

    return webpackMerge(commonConfiguration, {
        mode: 'development',
        devServer: devServ,
        entry: './src/index.js',
        output: {
            path: __dirname + '/dist',
            filename: 'bundle.js'
        }
    });
};
