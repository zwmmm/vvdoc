import React, { useMemo } from 'react'
import { useLocation } from 'react-router-dom'
import { Box, Grid } from 'theme-ui'
import { config } from '../config'
import Sidbar from './Sidbar'

export default function Container(props: { children: React.ReactNode }) {
  const location = useLocation()
  const chapters = useMemo(() => {
    const item =
      [...config.menus]
        .reverse()
        .find((item) => new RegExp(item.active).test(location.pathname)) ||
      config.menus[0]
    return config.chapters[item.path] || []
  }, [location])
  return (
    <Grid gap={18} columns="256px minmax(0px, 3.5fr) minmax(0px, 15rem)">
      <Sidbar chapters={chapters} />
      <Box>{props.children}</Box>
    </Grid>
  )
}
