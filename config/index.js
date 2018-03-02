'use strict'

// the inbuit node module
const path = require('path')

module.exports = {
    dev: {
        // the environment configurations
        env: 'development',
        // for setting the port of localhost
        port: 3000,
        // whether to open browser automatically on dev server start
        autoOpenBrowser: true,
        // static assets folder
        assetsSubDirectory: 'static',
        assetsPublicPath: '/',
        proxyTable: {},
        cssSourceMap: false
    }
}
