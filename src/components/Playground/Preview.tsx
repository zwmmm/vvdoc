import { alpha } from '@theme-ui/color'
import React, { memo } from 'react'
import { Box } from 'theme-ui'

// @ts-ignore
const Components = import.meta.globEager('/playground/**/*.tsx')

export const Preview = memo(
  (props: { url: string; sx?: any; className?: string }) => {
    const { url } = props
    const Comp = Components[`/playground/${url}`]?.default
    return (
      <Box
        className={props.className}
        p={2}
        sx={{
          bg: alpha('muted', 0.5),
          overflow: 'auto',
          flex: 1,
        }}
      >
        <Comp />
      </Box>
    )
  }
)
