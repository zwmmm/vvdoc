const mode = process.argv[2] || 'dev';
const { createServer, build } = require('vite');
const fs = require('fs');
const path = require('path');
const rimraf = require('rimraf');

function copy(src, dest) {
  const stat = fs.statSync(src)
  if (stat.isDirectory()) {
    copyDir(src, dest)
  } else {
    fs.copyFileSync(src, dest)
  }
}

function copyDir(srcDir, destDir) {
  fs.mkdirSync(destDir, { recursive: true })
  for (const file of fs.readdirSync(srcDir)) {
    const srcFile = path.resolve(srcDir, file)
    const destFile = path.resolve(destDir, file)
    copy(srcFile, destFile)
  }
}

const cwd = process.cwd();
const resolve = pathname => path.join(__dirname, pathname)

;(async () => {
  if (mode === 'init') {
    rimraf(path.join(cwd, '.vvdoc'), function () {
      copyDir(resolve('src'), path.join(cwd, '.vvdoc/src'))
      copy(resolve('index.html'), path.join(cwd, '.vvdoc/index.html'))
      copy(resolve('vite.config.ts'), path.join(cwd, '.vvdoc/vite.config.ts'))
      copy(resolve('index.d.ts'), path.join(cwd, '.vvdoc/index.d.ts'))
      copy(resolve('tsconfig.json'), path.join(cwd, '.vvdoc/tsconfig.json'))
      copy(resolve('tsconfig.node.json'), path.join(cwd, '.vvdoc/tsconfig.node.json'))
      console.log('初始化成功')
    })
  } else if (mode === 'dev') {
    const server = await createServer({
      root: cwd,
      configFile: path.join(cwd, '.vvdoc/vite.config.ts')
    })
    await server.listen()
    server.printUrls()
  } else {
    await build({
      root: __dirname
    })
  }
})()
