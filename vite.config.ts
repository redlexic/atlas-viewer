import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@omnipanel': path.resolve(__dirname, './omnipanel/src'),
    },
    dedupe: ['react', 'react-dom', '@react-three/fiber', '@react-three/drei', 'three'],
  },
})
