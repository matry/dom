import { defineConfig } from 'rollup';
import terser from '@rollup/plugin-terser';

const entries = [
  'main',
  'append',
  'empty',
  'jsx-runtime',
  'remove',
  'write',
];

export default defineConfig(entries.map((entry) => ({
  input: `src/${entry}.js`,
  output: {
    file: `dist/${entry}.js`,
    format: 'esm',
    sourcemap: true,
  },
  plugins: [
    terser(),
  ],
})));
