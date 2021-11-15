import type { AppProps } from 'next/app'
import { Header } from '../components/Header'

import '../styles/global.scss'

function MarvelUniverse({ Component, pageProps }: AppProps) {
  return (
    <>
      <Header />
      <Component {...pageProps} />
    </>
  )
}

export default MarvelUniverse
