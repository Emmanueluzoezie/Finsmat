import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { ContextProvider } from '../context/context'
import { SessionProvider } from 'next-auth/react'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider>
      <ContextProvider>
        <Component {...pageProps} />
      </ContextProvider>
    </SessionProvider>
  )
}
