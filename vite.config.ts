import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

// https://vitejs.dev/config/
export default defineConfig({
    base: '/BookWorld_Frontend_Vue/',
    plugins: [vue()],
    server: {
        host: true
    }
});
