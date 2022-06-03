import { useEffect, useRef } from 'react'
import { ActiveAnchor, useActiveAnchorSet } from '../misc/ActiveAnchor'

const slugs = new WeakMap()
let setActiveAnchor: (
  value: ActiveAnchor | ((prevState: ActiveAnchor) => ActiveAnchor)
) => void
const observer = new IntersectionObserver(
  (entries) => {
    const headers: [string, number, boolean, boolean][] = []

    for (let i = 0; i < entries.length; i++) {
      const entry = entries[i]
      if (entry && entry.rootBounds && slugs.has(entry.target)) {
        const [slug, index] = slugs.get(entry.target)
        const aboveHalfViewport =
          entry.boundingClientRect.y + entry.boundingClientRect.height <=
          entry.rootBounds.y + entry.rootBounds.height
        const insideHalfViewport = entry.intersectionRatio > 0

        headers.push([slug, index, aboveHalfViewport, insideHalfViewport])
      }
    }

    setActiveAnchor((f: ActiveAnchor) => {
      const ret: ActiveAnchor = { ...f }

      for (const header of headers) {
        ret[header[0]] = {
          index: header[1],
          aboveHalfViewport: header[2],
          insideHalfViewport: header[3],
        }
      }

      let activeSlug = ''
      let smallestIndexInViewport = Infinity
      let largestIndexAboveViewport = -1
      for (let s in ret) {
        ret[s].isActive = false
        if (
          ret[s].insideHalfViewport &&
          ret[s].index < smallestIndexInViewport
        ) {
          smallestIndexInViewport = ret[s].index
          activeSlug = s
        }
        if (
          smallestIndexInViewport === Infinity &&
          ret[s].aboveHalfViewport &&
          ret[s].index > largestIndexAboveViewport
        ) {
          largestIndexAboveViewport = ret[s].index
          activeSlug = s
        }
      }

      if (ret[activeSlug]) ret[activeSlug].isActive = true
      return ret
    })
  },
  {
    rootMargin: '0px 0px -50%',
    threshold: [0, 1],
  }
)

export const HeaderLink = ({
  tag: Tag,
  children,
  id,
  context,
  withObserver = true,
  ...props
}: {
  tag: any
  children: any
  id: string
  context: { index: number }
  withObserver?: boolean
}) => {
  setActiveAnchor = useActiveAnchorSet()
  const obRef = useRef<HTMLSpanElement>(null)

  const slug = id
  const index = context.index++

  useEffect(() => {
    const ref = obRef
    if (!ref.current) return

    slugs.set(ref.current, [slug, index])
    if (ref.current) observer.observe(ref.current)

    return () => {
      observer.disconnect()
      slugs.delete(ref.current!)
      setActiveAnchor((f: ActiveAnchor) => {
        const ret: ActiveAnchor = { ...f }
        delete ret[slug]
        return ret
      })
    }
  }, [])

  return (
    <Tag {...props}>
      <span
        sx={{
          mt: '-84px',
          width: 1,
          position: 'absolute',
          display: 'inline-block',
          '&:target + a .anchor-icon': {
            opacity: 1,
          },
        }}
        id={slug}
        ref={obRef}
      />
      <a
        href={'#' + slug}
        sx={{
          textDecorationLine: 'none',
          color: 'text',
        }}
      >
        {children}
        <span
          className="anchor-icon"
          aria-hidden
          sx={{
            pl: 2,
            color: 'gray',
            opacity: 0,
          }}
        >
          #
        </span>
      </a>
    </Tag>
  )
}
