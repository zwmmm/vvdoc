/// <reference types="vite/client" />

declare interface ChapterType {
  name: string
  path?: string
  children?: ChapterType[]
}

declare module '@config' {
  const config: {
    title: string
    logo: string
    repository: string
    menus: {
      text: string
      active: string
      path: string
    }[]
    chapters: Record<string, ChapterType[]>
    base: string
    docsearch: {
      appId: string
      indexName: string
      apiKey: string
    }
  }
  export default config
}
