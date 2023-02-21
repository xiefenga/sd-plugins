import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['src/index.ts'],
  treeshake: true,
  outDir: 'lib',
  format: ['cjs', 'esm' ],
  dts: true,
  splitting: false,
  sourcemap: true,
  clean: true,
})