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
    testTimeout: 15000,
    exclude: ['**/node_modules/**', '**/dist/**', '**/tests/e2e/**'],
  },
})