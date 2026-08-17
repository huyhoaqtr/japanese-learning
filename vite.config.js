import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    port: Number(process.env.PORT) || 5173,
  },
  preview: {
    port: Number(process.env.PORT) || 5173,
  },
  build: {
    // Lightning CSS's minifier (Vite's default here) incorrectly dedupes
    // `-webkit-backdrop-filter` / `backdrop-filter` and drops the unprefixed
    // one, breaking glassmorphism blur on non-Safari browsers in production.
    cssMinify: "esbuild",
  },
})
