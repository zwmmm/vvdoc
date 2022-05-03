import { defineConfig } from 'vite'
import { createHtmlPlugin } from "vite-plugin-html";
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

const customMainPath = resolve(root, 'main.tsx')
const isCustomMain = fs.existsSync(customMainPath)

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
      }),
      createHtmlPlugin({
        entry: 'src/main.tsx',
        inject: {
          data: {
            title: config.title,
            logo: config.logo
          },
          tags: config.htmlTags || []
        }
      })
    ],
    optimizeDeps: {
      include: ['react/jsx-runtime']
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
          resolve(root),
        ]
      }
    },
    define: {
      __ROOT__: JSON.stringify(relative(__dirname, root)),
      __CONFIG__: JSON.stringify(config),
      __CUSTOM_MAIN__: JSON.stringify(isCustomMain)
    }
  }
})
