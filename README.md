# 文档生成工具

## feature

1. 基于mdx，可以直接在文档里面写react组件
2. 基于vite 启动速度快，编写体验极佳
3. 简单，便捷

## 开始使用

```bash
npm create vvdoc
npm i
npm run dev
```

## vvdoc.config.json

```jsonc
{
  "title": "vvModal", // 文档标题
  "logo": "", // 文档logo
  "repository": "https://github.com/zwmmm/vvModal", // 代码仓库地址
  "menus": { // 右上角的菜单
    "/": "首页",
    "/apis": "API",
    "http://www.baidu.com": "外链"
  },
  "chapters": { // 对应页面的 侧边栏菜单
    "apis": [
      {
        "name": "Apis",
        "children": [
          {
            "name": "create",
            "path": "/apis"
          },
          {
            "name": "show",
            "path": "/apis/show"
          },
          {
            "name": "antdModal",
            "path": "/apis/antdModal"
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
