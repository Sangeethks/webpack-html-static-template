// 'use strict'
//
// const path = require('path')
// const config = require('../config')
//
// function resolve(dir) {
//     return path.join(__dirname, '..', dir)
// }
//
// module.exports = {
//     entry: {
//         app: './src/main.js'
//     },
//     output: {
//         path: config.build.assetsRoot,
//         filename: '[name].js',
//         publicPath: process.env.NODE_ENV === 'production' ? config.build.assetsPublicPath : config.dev.assetsPublicPath
//     },
//     resolve: {
//         extentions: ['.js', '.json', '.css', '.scss'],
//     },
// }


const path = require('path')
module.exports = {
    entry: './src/main.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js'
    }
}
