export function visit(
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
