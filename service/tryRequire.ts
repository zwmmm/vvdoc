import jiti from 'jiti'

export const tryRequire = (id: string, rootDir: string = process.cwd()) => {
  const _require = jiti(rootDir, { interopDefault: true, requireCache: false })
  try {
    return _require(id)
  } catch (err: any) {
    if (err.code !== 'MODULE_NOT_FOUND') {
      console.error(`Error trying import ${id} from ${rootDir}`, err)
    }
    return {}
  }
}
