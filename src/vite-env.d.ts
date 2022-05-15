/// <reference types="vite/client" />

declare interface ChapterType {
  name: string
  path?: string
  children?: ChapterType[]
}

declare const __CONFIG__: {
  title: string
  logo: string
  repository: string
  menus: {
    text: string,
    active: string,
    path: string
  }[]
  chapters: Record<string, ChapterType[]>,
  base: string
}

declare const __CUSTOM_MAIN__: string
declare const Playground: any
