import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
    server: {
        allowedHosts: true
    },
    build: {
        rollupOptions: {
            input: {
                main: resolve(__dirname, 'index.html'),
                flower: resolve(__dirname, 'flower.html'),
            },
        },
    },
});
