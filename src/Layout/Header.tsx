import { Box, BoxProps, Container, Image, useColorMode } from 'theme-ui'
import { Moon, Sun } from '../components/Icons'
import Space from './Space'
import { useNavigate } from 'react-router-dom'
import GithubIcon from "../components/Icons/Github";

const menus = Object.entries(__CONFIG__.menus).map(([path, name]) => ({
  name,
  path
}))

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
        ...props.sx
      }}
      onClick={toggleTheme}
    >
      {colorMode === 'dark' ? <Sun/> : <Moon/>}
    </Box>
  )
}

export default function () {
  const navigate = useNavigate()
  const jumpNav = (path: string) => {
    const matched = path.match(/^http/)
    if (matched) {
      window.open(path)
    } else {
      navigate(path)
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
          <Image src={__CONFIG__.logo} alt=""/>
          <Box>{__CONFIG__.title}</Box>
        </Space>
        <Space>
          {menus.map((item) => (
            <Box
              sx={{
                cursor: 'pointer'
              }}
              key={item.path}
              onClick={() => jumpNav(item.path)}
            >
              {item.name}
            </Box>
          ))}
          <Box>
            {__CONFIG__.repository && (
              <a
                sx={{
                  color: 'text'
                }}
                target="_blank"
                href={__CONFIG__.repository}
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
