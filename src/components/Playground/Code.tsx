import Prism from './Prism'
import { Language } from 'prism-react-renderer'

const codes = import.meta.globEager('/playground/**/*.tsx', { as: 'raw' })
export default function (props: { url: string }) {
  const { url } = props
  const dot = url.split('.').pop() as Language
  return (
    <Prism className={dot}>
      {codes[`/playground/${url}`] as unknown as string}
    </Prism>
  )
}
