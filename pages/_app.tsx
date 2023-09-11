import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { ContextProvider } from '../context/context'
import { SessionProvider } from 'next-auth/react'
import { Toaster } from 'react-hot-toast'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider>
      <ContextProvider>
        <Toaster />
        <Component {...pageProps} />
      </ContextProvider>
    </SessionProvider>
  )
}
