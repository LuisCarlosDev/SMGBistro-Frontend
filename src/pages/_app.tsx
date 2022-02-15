import { AppProps } from 'next/app';

import { Header } from "../components/Header";
import { AppProvider } from '../hooks';

import '../styles/global.scss';

function MyApp({ Component, pageProps }: AppProps) {

  return (
    <AppProvider>
      <Header />

      <Component {...pageProps} />
    </AppProvider>
  )
}

export default MyApp
