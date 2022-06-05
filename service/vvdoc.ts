import { resolve } from 'path'
import { defineConfig, mergeConfig } from 'vite'
import { config as defaultConfig } from './config.default'
import { propsgen } from './props'
import { toc } from './toc'
import { tryRequire } from './tryRequire'

export interface HeadingMeta {
  headings: any[]
}

export default function (options: { root: string }): any {
  const { root } = options
  const configName = './vvdoc.config.ts'
  const configPath = resolve(root, configName)

  function getConfig() {
    const module = tryRequire(configName, root)
    return JSON.stringify({
      ...defaultConfig,
      ...(module.config || {}),
    })
  }

  let userConfig = getConfig()

  return {
    name: 'vvdoc',
    load(id) {
      if (id === '/@config') {
        return `export default ${userConfig}`
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
          remarkPlugins: [
            remarkGfm,
            toc,
            [
              propsgen,
              {
                root: resolve(root, 'playground'),
              },
            ],
          ],
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
        userConfig = getConfig()
        return [server.moduleGraph.getModuleById('/@config')]
      }
    },
    config() {
      const module = tryRequire(configName, root)
      return mergeConfig(
        defineConfig({
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
        }),
        module?.buildConfig || {}
      )
    },
  }
}
