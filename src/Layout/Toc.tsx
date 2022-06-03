import Slugger from 'github-slugger'
import React from 'react'
import scrollIntoView from 'scroll-into-view-if-needed'
import { ActiveAnchor, useActiveAnchor } from '../misc/ActiveAnchor'

const indent = (level: number) => {
  switch (level) {
    case 3:
      return { marginLeft: '1rem ' }
    case 4:
      return { marginLeft: '2rem ' }
    case 5:
      return { marginLeft: '3rem ' }
    case 6:
      return { marginLeft: '4rem ' }
  }
  return {}
}

function Item({
  heading,
  slug,
  activeAnchor,
  text,
}: {
  heading: any
  slug: string
  activeAnchor: ActiveAnchor
  text: string
}) {
  const state = activeAnchor[slug]
  const ref = React.useRef<HTMLLIElement>(null)

  React.useEffect(() => {
    const el = ref.current
    const toc = document.getElementsByClassName('vvdoc-toc')[0]
    if (state?.isActive && el && toc) {
      scrollIntoView(el, {
        behavior: 'smooth',
        block: 'center',
        inline: 'center',
        scrollMode: 'always',
        boundary: toc,
      })
    }
  }, [state?.isActive])

  return (
    <li
      ref={ref}
      sx={{
        ...indent(heading.depth),
        my: 1,
        listStyle: 'none',
      }}
    >
      <a
        sx={{
          color: state?.isActive ? 'primary' : 'gray',
          textDecoration: 'none',
          fontWeight: 'bold',
        }}
        href={`#${slug}`}
        aria-selected={state?.isActive}
      >
        {text}
      </a>
    </li>
  )
}

export const Toc: React.FC<{
  headings: any[]
}> = (props) => {
  const { headings } = props
  const slugger = new Slugger()
  const activeAnchor = useActiveAnchor()
  return (
    <div>
      <div
        sx={{
          position: 'sticky',
          top: 80,
          width: 224,
          height: (t) => `calc(100vh - 80px - ${t.space?.[4]}px)`,
          color: 'text',
          overflowY: 'auto',
          fontSize: 1,
        }}
      >
        <div
          sx={{
            pb: 2,
            pt: 3,
          }}
        >
          目录
        </div>
        {headings.map((heading) => {
          const text = heading.value
          const slug = slugger.slug(text)
          return (
            <Item
              slug={slug}
              text={text}
              key={slug}
              activeAnchor={activeAnchor}
              heading={heading}
            />
          )
        })}
      </div>
    </div>
  )
}
