export interface SubNav {
  name: string
  url: string
}

export interface BusinessNav {
  name: string
  url: string
  params?: Record<string, string>
}

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

export interface HeaderConfig {
  isLevel: boolean
  subNavs: SubNav[]
  searchUrl: string
  workbanch: {
    url: string
    text: string
  }
  themes: Theme[]
  currentTheme: Theme
  busninessNavs: BusinessNav[]
  navAssetId: string
}