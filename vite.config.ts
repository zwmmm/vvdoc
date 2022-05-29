import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { join, resolve } from "path";
import * as fs from 'fs';

const root = process.cwd()
const configName = 'vvdoc.config.json'
const configPath = resolve(root, configName)
const config = {
  title: "vvDoc",
  logo: "",
  repository: "zwmmm/vvDoc",
  menus: {},
  chapters: {}
}

function mergeConfig() {
  if (fs.existsSync(configPath)) {
    Object.assign(config, JSON.parse(fs.readFileSync(configPath, 'utf-8')))
  }
}

mergeConfig()

export default defineConfig(async () => {
  const mdx = await import('@mdx-js/rollup')
  return {
    root,
    publicDir: resolve(process.cwd(), 'public'),
    plugins: [
      {
        name: 'vvdoc',
        load(id) {
          if (id === '/@config') {
            return `export default ${JSON.stringify(config)}`
          }
        },
        configureServer(server) {
          // 监听配置文件变更
          if (configPath) {
            server.watcher.add(configPath)
          }
        },
        async handleHotUpdate(ctx) {
          const { file, server } = ctx
          if (file === configPath) {
            mergeConfig()
            return [server.moduleGraph.getModuleById('/@config')]
          }
        }
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
        'theme-ui/jsx-runtime',
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
    build: {
      outDir: resolve(root, 'dist'),
    },
    resolve: {
      alias: {
        '@config': '/@config'
      }
    }
  }
})
