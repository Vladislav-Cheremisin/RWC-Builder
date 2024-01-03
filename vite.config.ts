import { defineConfig } from 'vite'
import cssInjectedByJsPlugin from 'vite-plugin-css-injected-by-js'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        react(),
        cssInjectedByJsPlugin({
            styleId: "rwc-builder-styles",
        }),
    ],
    build: {
        rollupOptions: {
            output: {
                entryFileNames: 'rwc-bundle/example-component.js', // TODO: Вынести имя компонента в глобальную переменную
            },
        }
    },
    publicDir: false,
})