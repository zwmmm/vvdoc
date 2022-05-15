import React, { useMemo } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import Container from '../Layout/Container'
import NotFont from "../Layout/NotFont";

const pages = import.meta.globEager('/docs/**/*.mdx')

function pathToFile(path: string): string {
  let pagePath = path
  if (pagePath.endsWith('/')) {
    pagePath += 'index'
  }
  return '/docs' + pagePath + '.mdx'
}

export default () => {
  const location = useLocation()
  const pageFilePath = useMemo(() => {
    return pathToFile(location.pathname)
  }, [location.pathname])
  const Page = pages[pageFilePath]?.default || NotFont
  const Element = (
    <Container>
      <Page/>
    </Container>
  )
  return (
    <Routes>
      <Route path={location.pathname} element={Element}/>
    </Routes>
  )
}
