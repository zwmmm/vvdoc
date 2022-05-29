import { Box } from "theme-ui";
import React, { memo } from "react";

const Components = import.meta.globEager('/playground/**/*.tsx')

export const Preview = memo((props: { url: string, sx?: any, className?: string }) => {
  const { url } = props
  const Comp = Components[`/playground/${url}`]?.default
  return (
    <Box
      className={props.className}
      p={2}
      sx={{
        bg: 'muted',
        overflow: 'auto',
        flex: 1,
      }}
    >
      <Comp/>
    </Box>
  )
})
