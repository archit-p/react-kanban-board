import { defineConfig } from 'vite';
import reactRefresh from '@vitejs/plugin-react-refresh';
import eslint from '@rollup/plugin-eslint';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    reactRefresh(),
    {
      ...eslint({
        include: ['./src/**/*.jsx', './src/**/*.js'],
      }),
      enforce: 'pre',
      apply: 'build',
    },
  ],
});
