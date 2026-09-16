import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      "/api": {
        target: "http://194.238.19.57:3001",  // uncomment this line for local development
        // target: "https://panigrahna-api.onrender.com", // uncomment this line for production deployment
        changeOrigin: true,
      },
    },
  },
})
