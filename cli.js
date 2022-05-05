const { createServer, build } = require('vite');
const path = require('path')
const mode = process.argv[2] || 'dev';
const rimraf = require('rimraf')
const fse = require('fs-extra');

const root = path.resolve(process.cwd(), '.vvDoc')

;(async () => {
  if (mode === 'init') {
    rimraf(root, () => {})
    fse.copySync(path.resolve(__dirname, 'template'), root, { overwrite: true })
  } else if (mode === 'dev') {
    const server = await createServer({
      root,
      publicDir: path.resolve(process.cwd(), 'public')
    })
    await server.listen()
    server.printUrls()
  } else {
    await build({
      root,
      publicDir: path.resolve(process.cwd(), 'public')
    })
  }
})()
