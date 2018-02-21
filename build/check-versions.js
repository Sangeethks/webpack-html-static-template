'use strict'

const chalk = require('chalk')
const semver = require('semver')
const packageConfig = require('../package.json')
const shell = require('shelljs')

function exec(command) {
    return require('child_process').execSync(command).toString().trim()
}

const versionRequirements = [{
    name: 'node',
    currentVersion: semver.clean(process.version),
    versionRequirement: packageConfig.engines.node
}]

if (shell.which('npm')) {
    versionRequirements.push({
        name: 'npm',
        currentVersion: exec('npm --version'),
        versionRequirement: packageConfig.engines.npm
    })
}

module.exports = function () {
    const warnings = []
    for (let i = 0; i < versionRequirements.length; i++) {
        const mod = versionRequirements[i]
        if (!semver.satisfies(mod.currentVersion, mod.versionRequirement)) {
            warning.push(mod.name + ' ' + chalk.red(mod.currentVersion) + ' : should be' + chalk.green(mod.versionRequirement))
        }
    }

    if (warnings.length) {
        console.log('');
        console.log(chalk.yello('To use this template, you must update the following modules:'));
        console.log();

        for (let i in warnings) {
            const warning = warnings[i]
            console.log('  ' + warning);
        }
        console.log();
        process.exit(1)
    }
}
