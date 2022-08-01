import asyncEslintPlugin from '@nabla/vite-plugin-eslint'
import vue from '@vitejs/plugin-vue'
import { defineConfig, loadEnv } from 'vite'
import syncEslintPlugin from 'vite-plugin-eslint'
import { createHtmlPlugin } from 'vite-plugin-html'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig(({ mode }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) }

  return {
    ...(mode === 'production'
      ? { base: `${process.env.VITE_APP_BASE_URL}/` }
      : {}),
    server: {
      port: 3220,
    },
    plugins: [
      tsconfigPaths(),
      vue(),
      ...(mode === 'production'
        ? [
          createHtmlPlugin(),
          syncEslintPlugin(),
        ]
        : [asyncEslintPlugin()]),
    ],
    css: {
      modules: {
        generateScopedName: '[hash:base64:6]',
      },
      preprocessorOptions: {
        scss: {
          additionalData: '@import "./src/ui/theme";',
        },
      },
    },
  }
})
