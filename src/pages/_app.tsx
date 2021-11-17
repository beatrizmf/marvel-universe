import type { AppProps } from 'next/app'
import { Header } from '../components/Header'
import { ToastContainer } from 'react-toastify'
import AppProvider from '../hooks'

import 'react-toastify/dist/ReactToastify.css'
import '../styles/global.scss'

function MarvelUniverse({ Component, pageProps }: AppProps) {
  return (
    <AppProvider>
      <Header />
      <Component {...pageProps} />
      <ToastContainer />
    </AppProvider>
  )
}

export default MarvelUniverse
