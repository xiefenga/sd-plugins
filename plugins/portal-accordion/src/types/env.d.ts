
declare module '*.png' {
  const src: string
  export default src
}

declare module '*.ttf' {
  const src: string
  export default src
}

declare module '*.svg' {
  const src: JSX
  export default src
}

// declare module 'styled-components' {
// export interface DefaultTheme {
//   colors: {
//     body: string;
//   };
// }
// }