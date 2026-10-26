import react from '@vitejs/plugin-react'
import { defineConfig } from 'vitest/config'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './tests/setup.ts',
    css: true,
    // Full-App render tests need headroom under parallel load.
    testTimeout: 30000,
    exclude: ['**/node_modules/**', '**/dist/**'],
  },
})