import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: '/IEEE_Inspect-to-Win_Website/',
  plugins: [react()],
})
