import type { AppProps } from 'next/app'

import '../styles/global.scss'

function MarvelUniverse({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}

export default MarvelUniverse
