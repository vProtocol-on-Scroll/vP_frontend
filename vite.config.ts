import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 8081, // Set the default port to 8080
  },
  preview: { // for prod
    port: 8081, 
  },
})
