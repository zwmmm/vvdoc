#!/usr/bin/env node
const { createServer, build } = require('vite')
const path = require('path')
const mode = process.argv[2] || 'dev';

;(async () => {
  if (mode === 'dev') {
    process.env.NODE_ENV = 'development'
    const server = await createServer({
      configFile: path.resolve(__dirname, '../vite.config.ts'),
    })
    await server.listen()
    server.printUrls()
  } else {
    process.env.NODE_ENV = 'production'
    await build({
      configFile: path.resolve(__dirname, '../vite.config.ts')
    })
  }
})()
