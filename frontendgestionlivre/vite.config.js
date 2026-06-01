// J'importe defineConfig depuis Vite pour configurer l'application
import { defineConfig } from 'vite'
// J'importe le plugin React pour que Vite comprenne le JSX
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  // J'ajoute le plugin React pour supporter le JSX et le hot reload
  plugins: [react()],
})