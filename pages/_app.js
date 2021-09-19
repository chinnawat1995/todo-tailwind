import { SessionProvider } from "next-auth/react";

import '../styles/globals.css'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider session={session}>
      <Component {...pageProps} />
    </SessionProvider>
  )
}

export default MyApp
