import "../styles/index.css";
import "../styles/grid.scss";
import "../styles/globals.scss";
import 'react-toastify/dist/ReactToastify.css';
import type { AppProps } from "next/app";
import { Fragment } from 'react'
import Head from "next/head";
import { ToastContainer } from 'react-toastify';
import type { Page } from '^types/page';

// this should give a better typing
type Props = AppProps & {
  Component: Page
}

function MyApp({ Component, pageProps }: Props) {
  // adjust accordingly if you disabled a layout rendering option
  const getLayout = Component.getLayout ?? (page => page);
  const Layout = Component.layout ?? Fragment;

  return (
    <>
      <Head>
        <title>Payplo | 똑똑한 팀을 위한 SaaS 관리 솔루션</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1, user-scalable=no"/>
      </Head>
      <Layout>
        {getLayout(<Component {...pageProps} />)}
      </Layout>
      <ToastContainer />
    </>
  );
}

export default MyApp;
