import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { configDefaults } from 'vitest/config';
import tsconfigPaths from 'vite-tsconfig-paths';

// https://vitejs.dev/config/
export default defineConfig(({ command }) => {

  const config = {
    plugins: [react(), tsconfigPaths()],
    base: '/',
    server: {
      port: 3030,
      host: true,
    },
    test: {
      globals: true,
      include: ['**/*.test.tsx', '**/*.test.ts'],
      environment: 'jsdom',
      setupFiles: './src/setup-tests.ts'
    }
  };

  if (command === 'build') {
    config.base = '/uru-todo-list/';
  }

  return config;
});
