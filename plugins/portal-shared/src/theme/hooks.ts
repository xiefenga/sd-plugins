import { useEffect, useState } from 'react'
import { useLocalStorageState, useMemoizedFn } from 'ahooks'

import { Theme } from '@/types'
import { DEFAULT_THEME } from '@/theme/theme'
import { EVENT_CENTER, EVENT_THEME_CHANGE } from '@/event'
import { APP_CURRENT_THEME_STORAGE_KEY } from '@/constants'

export const useTheme = (logo = '') => {
  const [theme, setTheme] = useLocalStorageState<Theme>(
    APP_CURRENT_THEME_STORAGE_KEY,
    { defaultValue: { ...DEFAULT_THEME, logo } }
  )

  const updateTheme = (theme: Theme) => {
    setTheme(theme)
    EVENT_CENTER.emit(EVENT_THEME_CHANGE, theme)
  }

  return [theme, useMemoizedFn(updateTheme)] as const
}

export const useCurrentTheme = (logo = '') => {

  const [currentTheme, setCurrentTheme] = useState<Theme>(() => {
    const raw = window.localStorage.getItem(APP_CURRENT_THEME_STORAGE_KEY)
    return raw ? JSON.parse(raw) : { ...DEFAULT_THEME, logo }
  })

  useEffect(() => {
    return EVENT_CENTER.on(EVENT_THEME_CHANGE, theme => {
      setCurrentTheme(theme)
    })
  }, [])

  return currentTheme
}