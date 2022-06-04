import React, { useEffect, useMemo } from 'react'
import { useLocation } from 'react-router-dom'
import { Grid } from 'theme-ui'
import { ChapterType } from '../../types'
import { config } from '../config'
import { ActiveAnchor } from '../misc/ActiveAnchor'
import { Breadcrumbs } from './Breadcrumbs'
import Sidbar from './Sidbar'
import { Toc } from './Toc'

export const Wrapper: React.FC<{
  children: React.ReactNode
  headings: any[]
}> = (props) => {
  const { pathname } = useLocation()
  const chapters: ChapterType[] = useMemo(() => {
    const item =
      [...config.menus]
        .reverse()
        .find((item) => new RegExp(item.active).test(location.pathname)) ||
      config.menus[0]
    return config.chapters[item.path] || []
  }, [location])
  const breadcrumbs = useMemo(() => {
    for (const chapter of chapters) {
      const menu = chapter.children?.find((item) => item.path === pathname)
      if (menu) {
        return [chapter.name, '/', menu.name]
      }
    }
    return []
  }, [chapters, location])
  const title = useMemo(() => {
    return breadcrumbs[breadcrumbs.length - 1]
  }, [breadcrumbs])
  useEffect(() => {
    if (title) {
      document.title = `${title}-${config.title}`
    }
    return () => {
      document.title = config.title
    }
  }, [title])
  return (
    <ActiveAnchor>
      <Grid gap={18} columns="256px minmax(0px, 3.5fr) minmax(0px, 15rem)">
        <Sidbar chapters={chapters} sx={{ width: 256, flexShrink: 0 }} />
        <div sx={{ px: '2em', flex: 1 }}>
          <Breadcrumbs breadcrumbs={breadcrumbs} />
          <h1>{title}</h1>
          <div>{props.children}</div>
        </div>
        <Toc headings={props.headings} />
      </Grid>
    </ActiveAnchor>
  )
}
