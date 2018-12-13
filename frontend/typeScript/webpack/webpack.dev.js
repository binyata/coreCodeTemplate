const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const webpack = require('webpack');

// https://webpack.js.org/guides/progressive-web-application/
// apparently a progressive web application (PWA) makes it where you can run without using the network

module.exports = merge(common, {
    output: {
        // helps speed up typescript compiling.
        pathinfo: false
    },
    mode: 'development',
    devtool: 'inline-source-map',
    devServer: {
        contentBase: './dist',
        hot: true,
        host: 'localhost'
    },
    // NamedModulesPlugin, helps with caching on dev server
    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ],
    // May need to look this up a bit more
    // optimization: {
    //     usedExports: true
    // }
});