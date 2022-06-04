import * as React from 'react'
import { RouteObject } from 'react-router-dom'

export interface PlainObject<T = any> {
  [key: string]: T
}

export interface RouteType extends RouteObject {
  name: string
}

export type ForwardRef<T, P> = React.ForwardRefExoticComponent<
  React.PropsWithoutRef<P> & React.RefAttributes<T>
>
