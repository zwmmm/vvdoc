import '@docsearch/css'
import { DocSearch } from '@docsearch/react'
import { config } from '../config'

export const Search = () => {
  const { docsearch } = config
  return (
    <DocSearch
      placeholder="搜索文档..."
      appId={docsearch.appId}
      indexName={docsearch.indexName}
      apiKey={docsearch.apiKey}
    />
  )
}
