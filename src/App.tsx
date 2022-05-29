import React from 'react'
import { Helmet } from 'react-helmet';
import Main from './Layout/Main'
import { config } from "./config";
import { useMDXComponents } from "@mdx-js/react";

export default function () {
  console.log(useMDXComponents())
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
