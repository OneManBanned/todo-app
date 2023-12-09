import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    origin: "http://localhost:5000",
    proxy: {
      "/app/": "http://localhost:5000", // the address that u serve in the backend 
    },
  }
})