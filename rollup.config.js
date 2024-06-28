import { defineConfig } from 'rollup';
import terser from '@rollup/plugin-terser';

export default defineConfig([
  {
    input: 'src/main.js',
    output: {
      file: 'dist/bundle.js',
      format: 'esm',
      sourcemap: true,
    },
    plugins: [
      terser(),
    ],
  },
]);
