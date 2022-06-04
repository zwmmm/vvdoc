import { Theme } from 'theme-ui'
import { Components } from '@mdx-js/react/lib'
import { UserConfig } from 'vite'

export interface ChapterType {
  name: string
  path?: string
  children?: ChapterType[]
}

export type Config = Partial<{
  title: string
  logo: string
  repository: string
  menus: {
    text: string
    active: string
    path: string
  }[]
  chapters: Record<string, ChapterType[]>
  docsearch: {
    appId: string
    indexName: string
    apiKey: string
  }
  theme: {
    styles?: Theme
    components?: Components
  }
}>

export type BuildConfig = UserConfig

export { Theme, Components }
