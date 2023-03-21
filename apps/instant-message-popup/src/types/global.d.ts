/// //<reference lib="webpack-env" />

interface Window {
  token?: string
}

declare const process: Process

declare module '*.png' {
  const src: string
  export default src
}
