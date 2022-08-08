import * as path from "path";
import react from "@vitejs/plugin-react";
import {defineConfig} from "vite";
import {VitePWA} from "vite-plugin-pwa";
import jotaiDebugLabel from 'jotai/babel/plugin-debug-label'
import jotaiReactRefresh from 'jotai/babel/plugin-react-refresh'

import manifest from "./manifest.json";


// https://vitejs.dev/config/
export default defineConfig({
    optimizeDeps: {},
    plugins: [
        react({babel: {plugins: [jotaiDebugLabel, jotaiReactRefresh]}}),
        VitePWA({
            manifest,
            includeAssets: ['favicon.svg', 'favicon.ico', 'robots.txt', 'apple-touch-icon.png'],
            // switch to "true" to enable sw on development
            devOptions: {
                enabled: false,
            },
            workbox: {
                globPatterns: ['**/*.{js,css,html}', '**/*.{svg,png,jpg,gif}'],
            },
        }),
    ],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
        },
    },
});
