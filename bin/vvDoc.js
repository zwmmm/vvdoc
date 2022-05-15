#!/usr/bin/env node
const { createServer, build } = require('vite')
const path = require('path')
const mode = process.argv[2] || 'dev';

const root = process.cwd()

;(async () => {
  if (mode === 'dev') {
    const server = await createServer({
      root,
      publicDir: path.resolve(process.cwd(), 'public'),
      configFile: path.resolve(__dirname, '../vite.config.ts')
    })
    await server.listen()
    server.printUrls()
  } else {
    await build({
      root,
      publicDir: path.resolve(process.cwd(), 'public'),
      configFile: path.resolve(__dirname, '../vite.config.ts')
    })
  }
})()
