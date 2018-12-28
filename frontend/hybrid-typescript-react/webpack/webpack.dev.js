const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const webpack = require('webpack');
const path = require('path');

// https://webpack.js.org/guides/progressive-web-application/
// apparently a progressive web application (PWA) makes it where you can run without using the network

module.exports = merge(common, {
    output: {
        // helps speed up typescript compiling.
        filename: '[name].[hash].js',
        chunkFilename: '[name].[hash].js',
        path: path.resolve(__dirname, 'dist'),
        pathinfo: false,
        publicPath: '/'
    },
    mode: 'development',
    devtool: 'inline-source-map',
    devServer: {
        compress: true,
        contentBase: './',
        hot: true,
        host: 'localhost',
        port: 3005,
        stats: { colors: true },
        historyApiFallback: {
            index: '/'
        }
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