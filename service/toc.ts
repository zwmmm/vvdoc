import { visit } from './utils'

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
