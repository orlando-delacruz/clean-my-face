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
    // Full-App render tests need headroom under parallel load: jsdom is heavy
    // and 17+ workers reliably time out on routing/accessibility suites.
    // Cap at 2 workers so the default `npm run test` passes consistently.
    maxWorkers: 2,
    // Full-App render tests need headroom under parallel load (17 jsdom workers).
    testTimeout: 30000,
    exclude: ['**/node_modules/**', '**/dist/**'],
  },
})