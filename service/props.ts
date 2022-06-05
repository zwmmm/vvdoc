import { existsSync } from 'fs'
import { AlignType } from 'mdast'
import {
  Children,
  emphasis,
  root as mdRoot,
  table,
  tableCell,
  tableRow,
  text,
} from 'mdast-builder'
import { resolve } from 'path'
import { ComponentDoc, parse, ParserOptions } from 'react-docgen-typescript'
import { Node, Parent } from 'unist'

interface PropsgenType {
  root: string
  options: ParserOptions
}

export type TableCellContent =
  | Children
  | string
  | boolean
  | number
  | undefined
  | null

const isChildren = (content: TableCellContent): content is Children =>
  !['number', 'string', 'boolean', 'undefined'].includes(typeof content) &&
  content !== null

export interface TableColumn<Item> {
  title: TableCellContent
  render: (row: Item, index: number, dataSource: Item[]) => TableCellContent
  alignType?: AlignType
}

const tableCellContentToNode = (content: TableCellContent = '') =>
  isChildren(content) ? content : text(`${content}`)

const tableMdastBuilder = <Item = unknown>(
  dataSource: Item[],
  columns: Array<TableColumn<Item>>
): Parent =>
  table(
    columns.map((vo) => vo.alignType),
    [
      columns.map((vo) => tableCell(tableCellContentToNode(vo.title))),
      ...dataSource.map((item, index) =>
        columns.map((vo) =>
          tableCell(tableCellContentToNode(vo.render(item, index, dataSource)))
        )
      ),
    ].map((vo) => tableRow(vo))
  )

const renderer = (componentDoc) => {
  return tableMdastBuilder(Object.values(componentDoc.props), [
    {
      title: '属性名',
      render: (vo: any) =>
        vo.required
          ? [text(vo.name), text(' '), emphasis(text('required'))]
          : vo.name,
    },
    {
      title: '类型',
      render: (vo) => vo.type.name,
    },
    {
      title: '默认值',
      render: (vo) => vo.defaultValue?.value || '-',
    },
    {
      title: '说明',
      render: (vo) => vo.description || '-',
    },
  ])
}

export const componentDocsMdastBuilder = (docs: ComponentDoc[]): Node[] => {
  return [].concat(...docs.map((vo) => renderer(vo)))
}

export const propsgen = (props: PropsgenType) => {
  const { root, options = {} } = props
  return async (tree: any) => {
    const { visit } = await import('unist-util-visit')

    visit(tree, 'mdxJsxFlowElement', (node, index, parent) => {
      if (node.name !== 'Props') {
        return
      }
      const fileName = node.attributes.find((item) => item.name === 'of')?.value
      const filepath = resolve(root, fileName)
      if (!existsSync(filepath)) {
        throw new Error('file does not exist')
      }
      parent.children.splice(
        index,
        1,
        mdRoot(componentDocsMdastBuilder(parse(filepath, options)))
      )
    })
  }
}
