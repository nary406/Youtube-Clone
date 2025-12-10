import StyledComponentsRegistry from '@/lib/registry'
import { AppProvider } from '@/context/AppContext'
import ThemeWrapper from '@/components/ThemeWrapper'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Nxt Watch',
  description: 'A YouTube Clone',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className} suppressHydrationWarning>
        <StyledComponentsRegistry>
          <AppProvider>
            <ThemeWrapper>
              {children}
            </ThemeWrapper>
          </AppProvider>
        </StyledComponentsRegistry>
      </body>
    </html>
  )
}
