import { createServer, build } from 'vite'
import  * as path from 'path'
const mode = process.argv[2] || 'dev';
import createPlugins from './plugin'

const root = process.cwd()

;(async () => {
  if (mode === 'dev') {
    const server = await createServer({
      root,
      publicDir: path.resolve(process.cwd(), 'public'),
      plugins: createPlugins()
    })
    await server.listen()
    server.printUrls()
  } else {
    await build({
      root,
      build: {
        outDir: path.resolve(root, 'dist'),
        emptyOutDir: true
      },
      publicDir: path.resolve(process.cwd(), 'public'),
      plugins: createPlugins()
    })
  }
})()
