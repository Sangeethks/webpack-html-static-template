'use strict'

// node.js file system module
const fs = require('fs')

// node.js path module
const path = require('path')

// utils contains some advanced webpack configuration,
// Specifically made for vue code compilation (my assumption)
// So not calling this right now
// const utils = require('./utils')

const webpack = require('webpack')
const config = require('../config')
const merge = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base.conf')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
