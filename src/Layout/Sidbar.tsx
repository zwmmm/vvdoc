import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Box } from 'theme-ui'
import { alpha } from '@theme-ui/color'
import { RouteType } from '../type'

const SubMenu: React.FC<{
  title: string
  children: React.ReactNode
}> = (props) => {
  return (
    <>
      <Box
        pt={3}
        px={2}
        pb={1}
        sx={{
          cursor: 'pointer',
          fontWeight: 'bold',
        }}
      >
        {props.title}
      </Box>
      {props.children}
    </>
  )
}

const MenuItem: React.FC<RouteType> = (props) => {
  const { path, name } = props
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const active = path === pathname
  const go = () => {
    navigate(path as string)
    window.scrollTo(0, 0)
  }
  return (
    <Box
      px={2}
      py={1}
      my={2}
      sx={{
        cursor: 'pointer',
        fontWeight: 'bold',
        color: active ? 'primary' : 'gray',
        backgroundColor: active ? alpha('primary', 0.1) : 'transparent',
        borderRadius: 4,
        '&:hover': {
          color: 'text',
          backgroundColor: alpha('muted', 0.5),
        },
      }}
      key={name}
      onClick={go}
    >
      {name}
    </Box>
  )
}

export default function Sidbar(props: { chapters: ChapterType[] }) {
  if (props.chapters.length <= 0) {
    return <div />
  }
  return (
    <Box
      sx={{
        backgroundColor: (t) => t.colors?.background,
        pr: 3,
      }}
    >
      <Box
        sx={{
          position: 'sticky',
          height: 'calc(100vh - 80px)',
          overflowY: 'auto',
          top: 80,
        }}
      >
        {props.chapters.map((item) => {
          if (!item.path) {
            return (
              <SubMenu title={item.name} key={item.name}>
                {item?.children?.map((sub: RouteType) => (
                  <MenuItem path={sub.path} name={sub.name} key={sub.name} />
                ))}
              </SubMenu>
            )
          }
          return <MenuItem path={item.path} name={item.name} key={item.name} />
        })}
      </Box>
    </Box>
  )
}
