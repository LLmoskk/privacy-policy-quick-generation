import { defineConfig } from 'vite';
import { codeInspectorPlugin } from 'code-inspector-plugin';
import eslintPlugin from '@nabla/vite-plugin-eslint';
import react from '@vitejs/plugin-react-swc';
import path from 'path';

/**
 * @see https://vitejs.dev/config/
 */
export default defineConfig({
  plugins: [react(), eslintPlugin(), codeInspectorPlugin({ bundler: 'vite' })],
  resolve: {
    alias: {
      '@': path.resolve('./src'),
    },
  },
  base: '/privacy-policy-quick-generation/', //  替换为你的仓库名
});
