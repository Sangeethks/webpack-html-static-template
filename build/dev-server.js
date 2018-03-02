'use strict'

// import config file, which contains the basic configurations
const config = require('../config')

console.log('dev-server.js | config | dev ', config.dev);

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
const express = require('express')

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
