import { AppProps } from 'next/app';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

import { Header } from "../components/Header";
import { AppProvider } from '../hooks';

import '../styles/global.scss';

function MyApp({ Component, pageProps }: AppProps) {

  return (
    <AppProvider>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <Header />

      <Component {...pageProps} />
    </AppProvider>
  )
}

export default MyApp
