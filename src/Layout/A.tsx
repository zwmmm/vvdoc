import React from 'react'

export const A: React.FC<{
  children?: React.ReactNode
  href?: string
}> = (props) => {
  const isExternal = props.href && props.href.startsWith('https://')
  return props.href ? (
    <a target={isExternal ? '_blank' : '_self'} {...props}>
      {props.children}
    </a>
  ) : null
}
