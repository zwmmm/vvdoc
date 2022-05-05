import { defineConfig, searchForWorkspaceRoot } from 'vite'
import react from '@vitejs/plugin-react'
import { relative, resolve } from "path";
import * as fs from 'fs';

const root = process.cwd()
const configName = 'vvdoc.config.json'
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
    resolve: {
      alias: {
        '@root': root
      }
    },
    server: {
      fs: {
        allow: [
          __dirname,
          searchForWorkspaceRoot(process.cwd()),
        ]
      }
    },
    define: {
      __ROOT__: JSON.stringify(relative(__dirname, root)),
      __CONFIG__: JSON.stringify(config)
    },
    build: {
      outDir: resolve(root, 'dist')
    }
  }
})
