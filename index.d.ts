declare module '*.mdx' {
  const MDXComponent: (props: any) => JSX.Element
  export default MDXComponent
}

// @ts-ignore
declare global {
  const Playground: (props: {
    main: string
    files?: string[]
    layout?: 'horizontal' | 'vertical'
  }) => JSX.Element
  const Message: (props: any) => JSX.Element
  const Alert: (props: any) => JSX.Element
  const Props: (props: { of: string }) => JSX.Element
}
