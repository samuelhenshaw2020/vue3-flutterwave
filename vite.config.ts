import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import {resolve} from "path";
import dts from 'vite-plugin-dts';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), dts({
    entryRoot: resolve(__dirname, "libs")
  })],
  server: {
    port: 3000
  },
  build: {
    minify: "esbuild",
    target: 'esnext',
    lib: {
      entry: resolve(__dirname, 'libs/index.ts'),
      name: 'vue3-flutterwave',
      fileName: (format) => `flutterwave.${format}.js`,
      formats: ['umd','es'],

    },
    rollupOptions: {
      // make sure to externalize deps that shouldn't be bundled
      // into your library
      
      external: ['vue'],
      output: {
        // Provide global variables to use in the UMD build
        // for externalized deps
        globals: {
          vue: 'Vue',
        },
      },
    },
  },
})
