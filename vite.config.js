import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      devOptions: {
        enabled: true,
      },
      manifest: {
        name: 'CabinIn Airlines',
        short_name: 'CabinIn',
        description: 'Your modern gateway to a faster, simpler, and more elegant flight booking experience.',
        theme_color: '#c44569',
        background_color: '#c44569',
        display: 'standalone',
        start_url: '/',
        scope: '/', // Menambahkan scope untuk PWA
        icons: [
          // Ikon 192x192px
          {
            src: '/pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          // Ikon 512x512px
          {
            src: '/pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png'
          },
          // Ikon berukuran 1024x1024px (sesuai deteksi di Manifest Anda)
          {
            src: '/pwa-512x512.png', // Menggunakan file yang sama
            sizes: '1024x1024',
            type: 'image/png'
          },
          {
            src: '/pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable'
          }
        ]
      },
      workbox: {
        // PERBAIKAN KRITIS UNTUK OFFLINE SPA
        navigateFallback: 'index.html', 
        
        // Caching untuk aset lokal statis (diberi pre-cache)
        globPatterns: ['**/*.{js,css,html,ico,png,svg}'],
        
        runtimeCaching: [
            // API Backend (diasumsikan di localhost:4000)
            {
                // Gunakan localhost untuk pengembangan
                urlPattern: ({ url }) => url.origin === 'http://localhost:4000',
                handler: 'NetworkOnly', // Selalu ambil data terbaru dari server
                options: {
                  cacheName: 'api-data',
                },
            },
            // Google Fonts (Cachable)
            {
              urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
              handler: 'CacheFirst',
              options: {
                cacheName: 'google-fonts-cache',
                expiration: {
                  maxEntries: 10,
                  maxAgeSeconds: 60 * 60 * 24 * 365
                },
                cacheableResponse: {
                  statuses: [0, 200]
                }
              }
            }
        ]
      }
    })
  ],
  
  optimizeDeps: {
    include: ['qrcode.react']
  }
})