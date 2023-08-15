import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base: "/sorting-algorithms/",
  build: {
    // lib:{},
    outDir: "build",
  },
  plugins: [react()],
})
