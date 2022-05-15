import React from 'react'
import { Helmet } from 'react-helmet';
import Main from './Layout/Main'
import { useConfig } from "./hooks/config";

export default function () {
  const config = useConfig()
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
