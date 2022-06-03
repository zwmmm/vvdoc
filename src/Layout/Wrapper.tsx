import React from 'react'
import { Grid } from 'theme-ui'
import { ActiveAnchor } from '../misc/ActiveAnchor'
import Sidbar from './Sidbar'
import { Toc } from './Toc'

export const Wrapper: React.FC<{
  children: React.ReactNode
  headings: any[]
}> = (props) => {
  return (
    <ActiveAnchor>
      <Grid gap={18} columns="256px minmax(0px, 3.5fr) minmax(0px, 15rem)">
        <Sidbar sx={{ width: 256, flexShrink: 0 }} />
        <div sx={{ px: '2em', flex: 1 }}>{props.children}</div>
        <Toc headings={props.headings} />
      </Grid>
    </ActiveAnchor>
  )
}
