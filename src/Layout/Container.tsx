import { Box, Grid } from 'theme-ui'
import { Outlet } from 'react-router-dom'
import Sidbar from './Sidbar'

export default function Container(props: { path: string }) {
  const chapters = __CONFIG__.chapters[props.path] || []
  return (
    <Grid gap={18} columns="180px minmax(0px, 3.5fr)">
      <Sidbar chapters={chapters}/>
      <Box>
        <Outlet/>
      </Box>
    </Grid>
  )
}