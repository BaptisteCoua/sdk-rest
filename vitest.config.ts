import { defineConfig } from 'vitest/config'
import { fileURLToPath } from 'node:url'

export default defineConfig({
  test: {
    environment: 'nuxt',
    globals: true,
    include: ['tests/**/*.spec.ts'],
    setupFiles: ['tests/setup.ts'],
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./', import.meta.url)),
    },
  },
})
