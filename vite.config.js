import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    'process.env': process.env
  },
  server: {
    port: parseInt(process.env.PORT) || 3000, // Default to 3000 if PORT is not defined
  },
})
