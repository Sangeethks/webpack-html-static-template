'use sctrict'

require('./check-versions')()

const config = require('../config')
if (!process.env.NODE_ENV) {
    process.env.NODE_ENV = JSON.parse(config.dev.env.NODE_ENV)
}

const opn = require('opn')
const path = require('path')
const express = require('express')
const proxyMiddleware = require('http-proxy-middleware')
const webpackConfig = process.env.NODE_ENV === 'testing' ? require('./webpack.prod.conf') : require('./webpack.dev.conf')

console.log('webpackConfig ', webpackConfig);

const port = process.env.PORT || config.dev.port
const autoOpenBrowser = !!config.dev.autoOpenBrowser
const proxyTable = config.dev.proxyTable

// the express server
const app = express()
// webpack compiler
const compiler = webpack(webpackConfig)

const devMiddleware = require('webpack-dev-middleware')(compiler, {
    publicPath: webpackConfig.output.publicPath,
    quiet: true
})

const hotMiddleware = require('webpack-hot-middleware')(compiler, {
    log: false
})

// force page reload on html-webpack-plugin template changes
compiler.plugin('compilation', function(compilation) {
    compilation.plugin('html-webpack-plugin-after-emit', function(data, cb) {
        hotMiddleware.publish({ action: 'reload' })
        cb()
    })
})

// enable hot-reload and state-perserving
// compilation error display
app.use(hotMiddleware)

// Proxy api request
Object.keys(proxyTable).forEach(function(context) {
    let options = proxyTable[context]
    if (typeof options === 'string') {
        options = { targe: options }
    }
    app.use(proxyMiddleware(options.filter || context, options))
})

// handle fallback for HTML5 history API
app.use(require('connect-history-api-fallback')())

// serve webpack bundle output
app.use(devMiddleware)

// serve pure static assets
const staticPath = path.posix.join(config.dev.assetsPublicPath, config.dev.assetsSubDirectory)
app.use(staticPath, express.static('./static'))

const uri = 'http://localhost:' + port

let _resolve
const readyPromise = new Promise(function(resolve) {
    _resolve = resolve
})

console.log('> Starting dev server ...')
devMiddleware.waitUntilValid(function() {
    console.log('> Listening at ' + uri + '\n')
    // when environment is testing, don't require below feature
    if (autoOpenBrowser && process.env.NODE_ENV !== 'testing') {
        // Auto opens the browser with uri
        opn(uri)
    }

    _resolve()
})

// Listen to port
const server = app.listen(port)

module.exports = {
    ready: readyPromise
    close: function() {
        server.close()
    }    
}