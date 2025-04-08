import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true, // usar describe, it, expect sem imports
    environment: 'node', // ideal para testes backend
    coverage: {
      provider: 'v8',
      reportsDirectory: './coverage',
      reporter: ['text', 'html', 'lcov'],
      exclude: ['**/node_modules/**', '**/tests/**'],
    },
    setupFiles: ['./vitest.setup.js'],
    include: ['src/**/*.test.ts'],
  },
});
