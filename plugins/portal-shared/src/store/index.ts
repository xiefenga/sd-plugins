import { create } from 'zustand'

import { Theme, User } from '@/types'
import { DEFAULT_THEME } from '../theme'

type Nullable<T> = T | null

export interface Store {
  theme: Theme
  user: Nullable<User>
  code: string
  setCode: (code: string) => void
  setUser: (user: User) => void
  changeTheme: (theme: Theme) => Promise<void>
}


window._0x1461A0_PORTAL_USE_STORE ??= create<Store>(
  set => ({
    theme: DEFAULT_THEME,
    user: null,
    code: '',

    setCode: (code: string) => {
      set({ code })
    },

    setUser: (user: User) => {
      set({ user })
    },

    changeTheme: async (theme: Theme) => {
      // request
      // await setCurrentTheme(theme)
      set({ theme })
    },
  })
)

export const useStore = window._0x1461A0_PORTAL_USE_STORE
