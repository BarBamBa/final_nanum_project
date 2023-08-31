import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import VitePluginHtmlEnv from 'vite-plugin-html-env'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(),
  VitePluginHtmlEnv(),
  VitePluginHtmlEnv({compiler: true})],
  
  base: '/final_project/',
  server: {
    proxy: {
      "/api": {
        // target: "http://localhost:9090/api",
        target: `${process.env.VITE_API_GATEWAY_HOST}`,
        changeOrigin: true,
        secure: false,
        // ws: false,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
    open: true,
  },
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "@testing-library/jest-dom",
    mockReset: true,
  },
})
