export interface ThemeColor {
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


export interface Theme {
  name: string
  logo: string
  color: ThemeColor
}