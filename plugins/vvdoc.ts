import * as fs from 'fs'
import { resolve } from 'path'
import { defineConfig } from 'vite'
import { toc } from './toc'

export interface HeadingMeta {
  headings: any[]
}

export default function (options: { root: string }): any {
  const { root } = options

  const configName = 'vvdoc.config.json'
  const configPath = resolve(root, configName)
  const config = {
    title: 'vvDoc',
    logo: '',
    repository: 'zwmmm/vvDoc',
    menus: {},
    chapters: {},
  }

  function mergeConfig() {
    if (fs.existsSync(configPath)) {
      Object.assign(config, JSON.parse(fs.readFileSync(configPath, 'utf-8')))
    }
  }

  mergeConfig()

  return {
    name: 'vvdoc',
    load(id) {
      if (id === '/@config') {
        return `export default ${JSON.stringify(config)}`
      }
    },
    async transform(src, id) {
      const { createProcessor } = await import('@mdx-js/mdx')
      const { default: remarkGfm } = await import('remark-gfm')
      const { default: slug } = await import('rehype-slug')
      if (id.endsWith('.mdx')) {
        const compiler = createProcessor({
          jsxImportSource: 'theme-ui',
          jsxRuntime: 'automatic',
          providerImportSource: '@mdx-js/react',
          remarkPlugins: [remarkGfm, toc],
          rehypePlugins: [slug],
        })
        compiler.data('headingMeta', {
          headings: [],
        })
        const { value } = await compiler.process(src)
        const content = String(value).replace('export default MDXContent;', '')
        const meta = JSON.stringify({
          ...(compiler.data('headingMeta') as HeadingMeta),
        })
        const prefix = ``
        const suffix = `export default function(props) {
          return _jsx("div", { children: _jsx(MDXContent, Object.assign({}, props, ${meta})) })
        }`
        return {
          map: null,
          code: prefix + content + suffix,
        }
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
    },
    config() {
      return defineConfig({
        root,
        publicDir: resolve(process.cwd(), 'public'),
        optimizeDeps: {
          include: ['react/jsx-runtime', 'theme-ui/jsx-runtime'],
        },
        css: {
          preprocessorOptions: {
            less: {
              javascriptEnabled: true,
            },
          },
        },
        server: {
          fs: {
            allow: [resolve(__dirname, '../'), root],
          },
        },
        build: {
          outDir: resolve(root, 'dist'),
        },
        resolve: {
          alias: {
            '@config': '/@config',
          },
        },
      })
    },
  }
}
