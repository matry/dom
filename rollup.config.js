import { defineConfig } from 'rollup';
import terser from '@rollup/plugin-terser';
import typescript from '@rollup/plugin-typescript';
import dts from 'rollup-plugin-dts';

export default defineConfig([
  {
    input: 'src/main.ts',
    output: {
      file: 'dist/bundle.js',
      format: 'esm',
      sourcemap: true,
    },
    plugins: [
      typescript(),
      terser(),
    ],
  },
  {
    input: './global.d.ts',
    output: {
      file: 'dist/global.d.ts',
      format: 'esm',
    },
    plugins: [dts()],
  },
  {
    input: './types.d.ts',
    output: {
      file: 'dist/types.d.ts',
      format: 'esm',
    },
    plugins: [dts()],
  },
]);
