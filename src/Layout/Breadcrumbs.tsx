import React from 'react'

export const Breadcrumbs: React.FC<{
  breadcrumbs: string[]
}> = (props) => {
  return (
    <div
      sx={{
        fontSize: 1,
        color: 'gray',
        pt: 3,
        cursor: 'pointer',
      }}
    >
      {props.breadcrumbs.map((item) => (
        <span
          sx={{
            mr: 2,
          }}
          key={item}
        >
          {item}
        </span>
      ))}
    </div>
  )
}
