import React from 'react'
import { Helmet } from 'react-helmet';
import Main from './Layout/Main'
import config from '@config'

export default function () {
  return (
    <>
      <Main/>
      <Helmet>
        <link rel="icon" type="image/svg+xml" href={config.logo}/>
        <title>{config.title}</title>
      </Helmet>
    </>
  )
}
