<h1 align='center'>
  <samp>vvdoc</samp>
  <a href='https://www.npmjs.com/package/vvdoc'>
    <img src='https://img.shields.io/npm/v/vvdoc?color=333&labelColor=555&style=flat-square' alt='version'/>
  </a>
</h1>

<p align='center'>
  <samp>基于 Vite 快速生成文档站点</samp>
<br>

## 特性

1. 开箱即用，快速生成文档站点
2. 基于vite 启动速度快，编写体验极佳
3. 基于mdx，直接运行React组件

## 开始使用

```bash
yarn create vvdoc
yarn
yarn dev
```

## 使用本文档生成的站点

|名称| 地址                          |
|---|-----------------------------|
|vvModal| https://vvmodal.vercel.app/ |

## vvdoc.config.json

```json
{
  "title": "vvModal",
  "logo": "",
  "repository": "https://github.com/zwmmm/vvModal",
  "menus": [
    {
      "text": "首页",
      "active": "^/",
      "path": "/"
    },
    {
      "text": "API",
      "active": "^/apis",
      "path": "/apis/"
    }
  ],
  "chapters": {
    "/apis/": [
      {
        "name": "Apis",
        "children": [
          {
            "name": "create",
            "path": "/apis/"
          },
          {
            "name": "show",
            "path": "/apis/show"
          },
          {
            "name": "antdModal",
            "path": "/apis/antdModal"
          },
          {
            "name": "antdDrawer",
            "path": "/apis/antdDrawer"
          }
        ]
      },
      {
        "name": "Hooks",
        "children": [
          {
            "name": "useModal",
            "path": "/apis/useModal"
          },
          {
            "name": "useShow",
            "path": "/apis/useShow"
          },
          {
            "name": "useHide",
            "path": "/apis/useHide"
          }
        ]
      }
    ]
  }
}

```
## 自定义入口

当你需要自定义入口，比如全局修改Antd的配置
根目录新增一个 `index.tsx`

```tsx
import { ConfigProvider } from 'antd'
import zhCN from 'antd/lib/locale/zh_CN'

export default function (props: any) {
  return (
    <ConfigProvider locale={zhCN} componentSize="small">
      {props.children}
    </ConfigProvider>
  )
}
```

## 内置组件

- Message,
- Alert,
- Playground