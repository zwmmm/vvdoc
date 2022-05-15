import { Plugin, PluginOption } from "vite";
import * as fs from 'fs';
import * as url from 'url';
import { resolve, join } from "path";
import react from "@vitejs/plugin-react";
import { default as mdx } from "@mdx-js/rollup";

const __dirname = url.fileURLToPath(new URL('.', import.meta.url));
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
    server: {
      fs: {
        allow: [
          resolve(__dirname, '../src'),
          process.cwd(),
        ]
      }
    },
    define: {
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
}

export default function (): PluginOption[] {
  return [
    viteDocPlugin,
    react({
      jsxImportSource: 'theme-ui',
      jsxRuntime: 'automatic',
      include: '**/*.tsx'
    }),
    mdx({
      jsxImportSource: 'theme-ui',
      jsxRuntime: 'automatic',
      providerImportSource: '@mdx-js/react',
      include: '**/*.mdx'
    })
  ]
}
