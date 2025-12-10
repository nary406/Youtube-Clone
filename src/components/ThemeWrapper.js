'use client'
import { useAppContext } from '@/context/AppContext'
import GlobalStyle from './GlobalStyle'
import { ThemeProvider } from 'styled-components'

export default function ThemeWrapper({ children }) {
  const { isDarkTheme } = useAppContext()
  
  const theme = {
    isDarkTheme,
    colors: {
      background: isDarkTheme ? '#0f0f0f' : '#f9f9f9',
      text: isDarkTheme ? '#f9f9f9' : '#0f0f0f',
      secondaryBackground: isDarkTheme ? '#181818' : '#ffffff',
      accent: '#ff0000',
      textSecondary: isDarkTheme ? '#aaaaaa' : '#606060',
      hover: isDarkTheme ? '#303030' : '#e5e5e5',
    }
  }

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle isDarkTheme={isDarkTheme} />
      {children}
    </ThemeProvider>
  )
}
