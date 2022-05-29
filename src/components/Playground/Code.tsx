import Prism from '@theme-ui/prism'

const alias: { [key: string]: string } = {
  'js': 'javascript',
  'sh': 'bash'
}

const codes = import.meta.globEager('/playground/**/*.tsx', { as: 'raw' })

export default function (props: { url: string }) {
  const { url } = props
  const extname = url.split('.').pop()
  if (!extname) {
    throw new Error(`${url}格式错误，没有后缀名`)
  }
  return (
    <Prism sx={{ margin: 0 }} className={alias[extname] || extname}>
      {codes[`/playground/${url}`] as unknown as string}
    </Prism>
  )
}
