
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { quasar, transformAssetUrls } from '@quasar/vite-plugin'
import { fileURLToPath, URL } from 'node:url'

export default defineConfig({
    base: '/C-Y-C-L-E-_-P-O-I-N-T/',   // ✅ обов’язково для GitHub Pages
    plugins: [
        vue({ template: { transformAssetUrls } }),
        quasar({
            sassVariables: fileURLToPath(new URL('./src/quasar-variables.sass', import.meta.url)),
        }),
    ],
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url)),
        },
    },
})

