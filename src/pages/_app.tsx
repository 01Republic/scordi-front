import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Head from "next/head";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Payplo | 똑똑한 팀을 위한 SaaS 관리 솔루션</title>
      </Head>
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
