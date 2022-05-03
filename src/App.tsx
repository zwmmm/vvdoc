import Main from './Layout/Main'
import React from 'react'
import { useMDXComponents } from "@mdx-js/react";

export default function () {
  console.log(useMDXComponents())
  return <Main />
}
