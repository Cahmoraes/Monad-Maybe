import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['cjs', 'esm'],
  target: 'es2016',
  bundle: true,
  clean: true,
  minify: false,
  dts: true,
  splitting: true,
  sourcemap: false,
  treeshake: true,
})
