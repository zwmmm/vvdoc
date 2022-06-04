import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import vvdoc from './service/vvdoc'

const root = process.cwd()

export default defineConfig({
  plugins: [
    vvdoc({
      root,
    }),
    react({
      jsxImportSource: 'theme-ui',
      jsxRuntime: 'automatic',
      include: '**/*.tsx',
    }),
  ],
})
