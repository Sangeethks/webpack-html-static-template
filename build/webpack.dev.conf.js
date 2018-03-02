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

// This is very useful package for webpack to easily merge arrays and objects,
// To webpack's configuration
const merge = require('webpack-merge')

// Basic webpack configuration
// Can be used with both production and development
// We will use webpack merge package to merge new configuration along with -
// This configuration
const baseWebpackConfig = require('./webpack.base.conf')

// A package which helps to create html files and html templates with configurations
const HtmlWebpackPlugin = require('html-webpack-plugin')

// Recognizes certain webpack errors and warnings and aggregates and clean them for -
// better development experience
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
