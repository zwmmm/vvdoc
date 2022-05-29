import { Box, BoxProps, Container, Image, useColorMode } from 'theme-ui'
import { Moon, Sun } from '../components/Icons'
import Space from './Space'
import { useLocation, useNavigate } from 'react-router-dom'
import GithubIcon from "../components/Icons/Github";
import { useMemo } from "react";
import { config } from "../config";

function SwitchTheme(props: BoxProps) {
  const [colorMode, setColorMode] = useColorMode()
  const toggleTheme = () => {
    const theme = colorMode === 'dark' ? 'light' : 'dark'
    setColorMode(theme)
  }
  return (
    <Box
      sx={{
        cursor: 'pointer',
        ...props.sx,
        '&:hover': {
          color: 'secondary'
        }
      }}
      onClick={toggleTheme}
    >
      {colorMode === 'dark' ? <Sun/> : <Moon/>}
    </Box>
  )
}

export default function () {
  const menus = config.menus
  const location = useLocation()
  const activeIndex = useMemo(() => {
    const index = [...menus].reverse().find(item => new RegExp(item.active).test(location.pathname)) || menus[0]
    return index.path
  }, [location])
  const navigate = useNavigate()
  const jumpNav = (path: string) => {
    const matched = path.match(/^http/)
    if (matched) {
      window.open(path)
    } else {
      navigate(path)
      window.scrollTo(0, 0)
    }
  }
  return (
    <Box
      sx={{
        backgroundColor: 'highlight',
        fontSize: 1,
        fontWeight: 'bold',
        position: 'fixed',
        zIndex: 100,
        width: '100%'
      }}
    >
      <Container
        sx={{
          height: 50,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}
      >
        <Space onClick={() => navigate('/')} sx={{ cursor: 'pointer' }}>
          <Image sx={{ width: '30px' }} src={config.logo} alt=""/>
          <Box sx={{ fontFamily: 'monospace', fontSize: 2 }}>{config.title}</Box>
        </Space>
        <Space>
          {menus.map((item: any) => (
            <Box
              sx={{
                cursor: 'pointer',
                color: activeIndex === item.path ? 'primary' : 'text',
                '&:hover': {
                  color: 'secondary'
                }
              }}
              key={item.path}
              onClick={() => jumpNav(item.path)}
            >
              {item.text}
            </Box>
          ))}
          <Box>
            {config.repository && (
              <a
                sx={{
                  color: 'text',
                  '&:hover': {
                    color: 'secondary'
                  }
                }}
                target="_blank"
                href={config.repository}
              >
                <GithubIcon/>
              </a>
            )}
          </Box>
          <SwitchTheme/>
        </Space>
      </Container>
    </Box>
  )
}
