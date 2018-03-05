'use strict'

// import config file, which contains the basic configurations
const config = require('../config')

// The NODE_ENV variable will be undefined by default
// We have to tell the webpack that we are running a development environment
// Inorder to do that, set the value of NODE_ENV variable to 'development'
if (!process.env.NODE_ENV) {
    process.env.NODE_ENV = config.dev.env
}

// console.log('dev-server.js | ');

// This package will open websites, files and executable cross platform wise
const opn = require('opn')

// The node.js module
const path = require('path')

// This is a web framework of node
// Creates HTTP servers easily
// Mainly used for SPA's, websites, hybrid apps and public HTTP API's
// Allows to setup middlewares to respond to HTTP request
const express = require('express')

// Webpack is module bundler, transform javascript and javascript packages
// It can preprocess files while compiling (using loaders), eg: typescript or javascript, images,
// To Base64
// Uses plugin interface
const webpack = require('webpack')

// Decided not to use it right now
// Because, I think this is for handling the default HTML histroy fallback API
// NOTE: COMMENTED
// const proxyMiddleware = require('http-proxy-middleware')

// The webpack configurations
// Based on the environment
const webpackConfig = process.env.NODE_ENV === 'testing' ? require('./webpack.prod.conf') : require('./webpack.dev.conf')

// PORT will be undefined by default,
// So set its value to the port value from config file
const port = process.env.PORT || config.dev.port
// whether to automatically open the browser,
// If not set value will be false
const autoOpenBrowser = !!config.dev.autoOpenBrowser

// HTTP proxies are used to serve custom API backend
// Don't know much about this feature
// This is an empty object right now
const proxyTable = config.dev.proxyTable

const app = express()
const compiler = webpack(webpackConfig)

const devMiddleware = require('webpack-dev-middleware')(compiler, {
    publicPath: webpackConfig.output.publicPath,
    quiet: true
})

const hotMiddleware = require('webpack-hot-middleware')(compiler, {
    log: false
})

// This forces page to reload when html-webpack-plugin template changes
compiler.plugin('compilation', function(compilation) {
    compilation.plugin('html-webpack-plugin-after-emit', function (data, cb) {
        hotMiddleware.publish({ action: 'reload' })
        cb()
    })
})

// enable hot-reload and state-preserving
// compilation error display
app.use(hotMiddleware);

app.use(require('connect-history-api-fallback')())

app.use(devMiddleware)

const staticPath = path.posix.join(config.dev.assetsPublicPath, config.dev.assetsSubDirectory)
app.use(staticPath, express.static('./static'))

const uri = 'http://localhost:' + port

var _resolve
const readyPromise = new Promise(function (resolve) {
    _resolve = resolve
})

console.log('> Starting dev server...');
devMiddleware.waitUntilValid(function () {
    console.log('> Listening at ' + uri + '\n');

    // When node environment is testing, don't open the browser
    if (autoOpenBrowser && process.env.NODE_ENV !== 'testing') {
        opn(uri)
    }
    _resolve()
})

const server = app.listen(port)

module.exports = {
    ready: readyPromise,
    close: function () {
        server.close()
    }
}
