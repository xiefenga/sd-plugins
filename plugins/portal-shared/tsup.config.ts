import { defineConfig } from 'tsup'

export default defineConfig({
  entry: [
    'src/index.ts', 
    'src/store/index.ts',
    'src/configuration/index.ts',
  ],
  splitting: false,
  sourcemap: true,
  clean: true,
  outDir: 'lib',
  format: ['esm'],
  outExtension() {
    return {
      js: '.js',
    }
  },
  dts: true,
})