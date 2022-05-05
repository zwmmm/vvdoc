import React from 'react'
import { Helmet } from 'react-helmet';
import Main from './Layout/Main'

export default function () {
  return <>
    <Main/>
    <Helmet>
      <link rel="icon" type="image/svg+xml" href={__CONFIG__.logo}/>
      <title>{__CONFIG__.title}</title>
    </Helmet>
  </>
}
