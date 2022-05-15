import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { join, resolve } from "path";
import * as fs from 'fs';

const root = process.cwd()
const mainPath = join(__dirname, '../src')
const configName = 'vvdoc.config.json'
const configPath = resolve(root, configName)
const config = {
  title: "vvDoc",
  logo: "",
  repository: "zwmmm/vvDoc",
  menus: {},
  chapters: {},
  htmlTags: []
}

if (fs.existsSync(resolve(root, configName))) {
  Object.assign(config, JSON.parse(fs.readFileSync(resolve(root, configName), 'utf-8')))
}

export default defineConfig(async () => {
  const mdx = await import('@mdx-js/rollup')
  return {
    plugins: [
      {
        name: 'vvdoc',
        configureServer(server) {
          if (configPath) {
            server.watcher.add(configPath)
          }
          return () => {
            server.middlewares.use((req, res, next) => {
              if (req.url!.endsWith('.html')) {
                res.statusCode = 200
                res.setHeader('Content-Type', 'text/html')
                res.end(`
<!DOCTYPE html>
<html>
  <head>
    <title>${config.title}</title>
    <link rel="icon" type="image/svg+xml" href=${config.logo}/>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width,initial-scale=1">
    <meta name="description" content="">
  </head>
  <body>
    <div id="app"></div>
    <script type="module">
    import RefreshRuntime from "/@react-refresh"
    RefreshRuntime.injectIntoGlobalHook(window)
    window.$RefreshReg$ = () => {}
    window.$RefreshSig$ = () => (type) => type
    window.__vite_plugin_react_preamble_installed__ = true
    </script>
    <script type="module" src="/@fs/${mainPath}/main.tsx"></script>
  </body>
</html>`)
                return
              }
              next()
            })
          }
        },
      },
      react({
        jsxImportSource: 'theme-ui',
        jsxRuntime: 'automatic',
        include: '**/*.tsx'
      }),
      mdx.default({
        jsxImportSource: 'theme-ui',
        jsxRuntime: 'automatic',
        providerImportSource: '@mdx-js/react'
      })
    ],
    optimizeDeps: {
      include: [
        'react/jsx-runtime',
      ]
    },
    css: {
      preprocessorOptions: {
        less: {
          javascriptEnabled: true
        }
      }
    },
    server: {
      fs: {
        allow: [
          __dirname,
          process.cwd(),
        ]
      }
    },
    define: {
      __CONFIG__: JSON.stringify(config)
    },
    build: {
      outDir: resolve(root, 'dist')
    }
  }
})
