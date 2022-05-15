import { Plugin, PluginOption } from "vite";
import { relative, resolve, join } from "path";
import * as fs from 'fs';
import react from "@vitejs/plugin-react";
// import mdx from "@mdx-js/rollup";

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
  htmlTags: [],
  base: '/'
}

if (fs.existsSync(configPath)) {
  Object.assign(config, JSON.parse(fs.readFileSync(configPath, 'utf-8')))
}

const viteDocPlugin: Plugin = {
  name: 'vvdoc',
  config: () => ({
    base: config.base || '/',
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
    resolve: {
      alias: {
        '@root': root
      }
    },
    server: {
      fs: {
        allow: [
          resolve(__dirname, '../src'),
          process.cwd(),
        ]
      }
    },
    define: {
      __ROOT__: JSON.stringify(relative(__dirname, root)),
      __CONFIG__: JSON.stringify(config)
    },
  }),
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
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width,initial-scale=1">
    <meta name="description" content="">
  </head>
  <body>
    <div id="app"></div>
    <script type="module" src="/@fs/${mainPath}/main.tsx"></script>
  </body>
</html>`)
          return
        }
        next()
      })
    }
  },
}

export default function (): PluginOption[] {
  return [
    viteDocPlugin,
    react({
      jsxImportSource: 'theme-ui',
      jsxRuntime: 'automatic',
      include: '**/*.tsx'
    }),
    // mdx({
    //   jsxImportSource: 'theme-ui',
    //   jsxRuntime: 'automatic',
    //   providerImportSource: '@mdx-js/react'
    // })
  ]
}
