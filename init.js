const rimraf = require('rimraf')
const path = require('path')
const fse = require('fs-extra');

const vvDocPath = path.resolve(process.cwd(), '.vvDoc')

rimraf(vvDocPath)

fse.copySync(path.resolve(__dirname, 'template'), vvDocPath, { overwrite: true })
