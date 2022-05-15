import { Box, Grid } from 'theme-ui'
import Sidbar from './Sidbar'
import React, { useMemo } from "react";
import { useLocation } from "react-router-dom";

export default function Container(props: { children: React.ReactNode }) {
  const location = useLocation()
  const chapters = useMemo(() => {
    const item = [...__CONFIG__.menus].reverse().find(item => new RegExp(item.active).test(location.pathname)) || __CONFIG__.menus[0]
    return __CONFIG__.chapters[item.path] || []
  }, [location])
  return (
    <Grid gap={18} columns={chapters.length <= 0 ? 'minmax(0px, 3.5fr)' : '180px minmax(0px, 3.5fr)'}>
      <Sidbar chapters={chapters}/>
      <Box>
        {props.children}
      </Box>
    </Grid>
  )
}
