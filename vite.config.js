import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  
  // PERBAIKAN: Hapus alias yang salah, tetapi pertahankan optimizeDeps
  optimizeDeps: {
    // Memberi tahu Vite untuk memproses dependensi ini
    include: ['qrcode.react']
  }
  // Bagian 'resolve: { alias: ... }' DIHAPUS TOTAL
})