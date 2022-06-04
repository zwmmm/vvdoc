import { Theme } from 'theme-ui'
import { Components } from '@mdx-js/react/lib'

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
  base: string
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

export { Theme, Components }
