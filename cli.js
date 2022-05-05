const { createServer, build } = require('vite');
const path = require('path')
const mode = process.argv[2] || 'dev';

const root = path.resolve(process.cwd(), '.vvDoc')

;(async () => {
  if (mode === 'dev') {
    const server = await createServer({
      root
    })
    await server.listen()
    server.printUrls()
  } else {
    await build({
      root
    })
  }
})()
