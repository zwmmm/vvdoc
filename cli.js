const mode = process.argv[2] || 'dev';
const { createServer, build } = require('vite');

;(async () => {
  if (mode === 'dev') {
    const server = await createServer({
      root: __dirname
    })
    await server.listen()
    server.printUrls()
  } else {
    await build({
      root: __dirname
    })
  }
})()
