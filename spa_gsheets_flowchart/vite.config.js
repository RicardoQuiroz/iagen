import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/iagen/spa_gsheets_flowchart/',
  build: {
    rollupOptions: {
      output: {
        // Esta configuración evita que los archivos empiecen con guion bajo (_)
        sanitizeFileName: (name) => {
          return name.replace(/^_+/, '');
        },
        assetFileNames: 'assets/[name]-[hash][extname]',
        chunkFileNames: 'assets/[name]-[hash].js',
        entryFileNames: 'assets/[name]-[hash].js',
      },
    },
  },
})
