/// <reference types="vite/client" />
declare const __ROOT__: string

declare interface ChapterType {
  name: string
  path?: string
  children?: ChapterType[]
}

declare const __CONFIG__: {
  title: string
  logo: string
  repository: string
  menus: Record<string, string>
  chapters: Record<string, ChapterType[]>,
  base: string
}

declare const __CUSTOM_MAIN__: string
declare const Playground: any
