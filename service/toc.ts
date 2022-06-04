function visit(
  node: any,
  tester: (node: any) => boolean,
  handler: (node: any) => any
) {
  if (tester(node)) {
    handler(node)
  }
  if (node.children) {
    node.children.forEach((n: any) => visit(n, tester, handler))
  }
}

function getFlattenedValue(node) {
  return node.children
    .map((child) =>
      'children' in child
        ? getFlattenedValue(child)
        : 'value' in child
        ? child.value
        : ''
    )
    .join('')
}

export function toc() {
  const data = this.data() as any
  return (tree: any) => {
    visit(
      tree,
      (node) => node.type === 'heading',
      (node) => {
        if (node.depth === 1) {
          return
        }
        const value = getFlattenedValue(node)
        data.headingMeta.headings.push({
          ...node,
          value,
        })
      }
    )
  }
}
