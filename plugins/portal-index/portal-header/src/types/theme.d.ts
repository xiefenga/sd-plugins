import 'styled-components'

declare module 'styled-components' {
  export interface DefaultTheme {
    font: {
      active: string
      hover: string
      default: string
    }
    bg: {
      active: string
      hover: string
      default: string
    }
    border: {
      color: string
    }
  }
}