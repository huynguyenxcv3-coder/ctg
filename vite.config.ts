import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "."),
    },
  },
  server: {
    port: 5000,
    host: '0.0.0.0',
    strictPort: true,
    allowedHosts: true,
    watch: {
      ignored: [
        '**/node_modules/**',
        '**/.pythonlibs/**',
        '**/.cache/**',
        '**/.local/**',
        '**/.git/**',
        '**/aws/**',
        '**/backend_extracted/**',
        '**/cuong-thong-gio/**',
        '**/cc-nim/**',
        '**/v-bot/**',
        '**/my-notion-worker/**',
        '**/tailscale_state/**',
        '**/ssh_server/**',
        '**/extension/**',
        '**/.antigravitycli/**',
        '**/.gemini_backup/**',
        '**/.config_backup/**',
        '**/.seo-backup-*/**',
      ],
    },
    proxy: {
      '/api': {
        target: 'http://localhost:3001',
        changeOrigin: true,
      },
    },
  },
  preview: {
    port: 3000,
    host: '0.0.0.0',
    strictPort: true,
    allowedHosts: true,
  },
  build: {
    sourcemap: false,
    minify: 'esbuild',
    rollupOptions: {
    }
  }
})
