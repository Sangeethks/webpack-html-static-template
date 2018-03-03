// 'use strict'

const path = require('path')
const config = require('../config')

// function resolve(dir) {
//     return path.join(__dirname, '..', dir)
// }

console.log('assetsRoot ', config.build.assetsRoot);
console.log('build assetsPublicPath ', config.build.assetsPublicPath);
console.log('dev assetsPublicPath ', config.dev.assetsPublicPath);
console.log('NODE_ENV ', process.env.NODE_ENV);

module.exports = {
    entry: {
        app: './src/main.js'
    },
    output: {
        path: config.build.assetsRoot,
        filename: '[name].js',
        publicPath: process.env.NODE_ENV === 'production' ? config.build.assetsPublicPath : config.dev.assetsPublicPath
    },
    resolve: {
        extensions: ['.js'],
        alias: {
            components: path.resolve(__dirname, 'src/components/'),
            containers: path.resolve(__dirname, 'src/containers/'),
            utils: path.resolve(__dirname, 'src/utils/'),
        },
    }
}


// const path = require('path')
// module.exports = {
//     entry: './src/main.js',
//     output: {
//         path: path.resolve(__dirname, 'dist'),
//         filename: '[name].js'
//     }
// }
