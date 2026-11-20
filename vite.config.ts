import fs from 'node:fs'
import path from 'node:path'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// Line counts of the React Bits components, measured at build time so the
// showcase's numbers always match the files in src/components.
const kitDir = path.resolve(import.meta.dirname, 'src/components')
const kitFiles = fs
  .readdirSync(kitDir)
  .filter((f) => f.endsWith('.tsx'))
  .map((f) => ({
    name: f.replace(/\.tsx$/, ''),
    lines: fs.readFileSync(path.join(kitDir, f), 'utf8').split('\n').length,
  }))

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  define: { __KIT_FILES__: JSON.stringify(kitFiles) },
  resolve: {
    alias: { '@': path.resolve(import.meta.dirname, './src') },
  },
})
