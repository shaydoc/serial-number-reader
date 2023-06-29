import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    // ...
    environment: 'jsdom',
    globals: true,
    threads: false,
    watch: false,
    include: ['**/*.test.{js,tsx,ts}'],
  },
})
