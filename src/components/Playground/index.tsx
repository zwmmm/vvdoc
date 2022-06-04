import clsx from 'clsx'
import React, { useMemo, useState } from 'react'
import { Box, Flex, Grid, useColorMode } from 'theme-ui'
import Code from './Code'
import { Preview } from './Preview'

const FileTabs = (props: {
  files: string[]
  activeIndex: number
  setIndex: (index: number) => void
}) => {
  const { activeIndex, files, setIndex } = props
  return (
    <Flex
      sx={{
        backgroundColor: 'background',
        borderRadius: 8,
      }}
    >
      {files.map((item, index) => {
        return (
          <Box
            px={3}
            py={2}
            sx={{
              cursor: 'pointer',
              borderBottom: '2px solid transparent',
              fontSize: 1,
              '&.active': {
                color: 'primary',
                borderBottomColor: 'primary',
              },
            }}
            key={index}
            className={clsx({ active: activeIndex === index })}
            onClick={() => setIndex(index)}
          >
            {item}
          </Box>
        )
      })}
    </Flex>
  )
}

const Playground: React.FC<{
  main: string
  files?: string[]
  layout?: 'horizontal' | 'vertical'
}> = function (props) {
  const layout = props.layout || 'horizontal'
  const [mode] = useColorMode()
  const cardStyle = useMemo(() => {
    if (mode === 'light') {
      return {
        borderRadius: 8,
        boxShadow: '0 0 8px rgba(0, 0, 0, 0.125)',
      }
    }
    return {
      overflow: 'hidden',
      borderRadius: 8,
      border: '1px solid',
      borderColor: 'muted',
    }
  }, [mode])
  const [activeIndex, setIndex] = useState<number>(0)
  const files = props.files || [props.main]
  const activeUrl = files[activeIndex]
  const [showCode, setShowCode] = useState(false)
  if (layout === 'horizontal') {
    return (
      <Box sx={cardStyle}>
        <FileTabs files={files} activeIndex={activeIndex} setIndex={setIndex} />
        <Grid gap={0} columns="50% 50%" sx={{ height: 500 }}>
          <Code url={activeUrl} />
          <Preview url={props.main} />
        </Grid>
      </Box>
    )
  }
  return (
    <Box sx={cardStyle} className="ukyou-playground">
      <Box>
        <Preview sx={{ background: 'background' }} url={props.main} />
        <Flex
          sx={{
            height: '60px',
            borderTop: (t) => `1px solid ${t.colors?.muted}`,
            borderBottom: (t) => `1px solid ${t.colors?.muted}`,
            cursor: 'pointer',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          onClick={() => setShowCode((val) => !val)}
        >
          {showCode ? '收起代码' : '查看代码'}
        </Flex>
      </Box>
      {showCode && (
        <>
          <FileTabs
            files={files}
            activeIndex={activeIndex}
            setIndex={setIndex}
          />
          <Box>
            <Code url={activeUrl} />
          </Box>
        </>
      )}
    </Box>
  )
}

export default Playground
