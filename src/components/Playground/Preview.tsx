import { Box } from "theme-ui";
import React, { Suspense, lazy, memo } from "react";

export const Preview = memo((props: { url: string, sx?: any, className?: string }) => {
  const { url } = props
  const Comp = lazy(() => import(/* @vite-ignore */ `/playground/${url}`))
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
      <Suspense fallback={null}>
        <Comp/>
      </Suspense>
    </Box>
  )
})
