import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { configDefaults } from 'vitest/config';
import tsconfigPaths from 'vite-tsconfig-paths';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  server: {
    port: 3000
  },
  test: {
    globals: true,
    include: ['**/*.test.tsx', '**/*.test.ts'],
    environment: 'jsdom',
    setupFiles: './src/setup-tests.ts'
  }
})
