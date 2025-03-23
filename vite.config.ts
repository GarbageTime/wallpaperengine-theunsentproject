import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tsConfigPaths from 'vite-tsconfig-paths'
import tailwindcss from '@tailwindcss/vite'
import { viteStaticCopy } from 'vite-plugin-static-copy'
import { viteSingleFile } from "vite-plugin-singlefile"

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    viteSingleFile(),
    tailwindcss(),
    tsConfigPaths(),
    viteStaticCopy({
      targets: [
        {
          src: 'assets/steam/**/*',
          dest: '.'
        }
      ]
    })
  ],
})
