import { defineConfig } from 'vite'
import { devtools } from '@tanstack/devtools-vite'

import { TanStackRouterVite } from '@tanstack/router-plugin/vite'
import viteReact from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

const config = defineConfig({
  resolve: { tsconfigPaths: true },
  plugins: [devtools(), tailwindcss(), TanStackRouterVite(), viteReact()],
  base: '/'
})

export default config
