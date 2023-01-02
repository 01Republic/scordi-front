import '../styles/index.css';
import '../styles/grid.scss';
import '../styles/globals.scss';
import 'react-toastify/dist/ReactToastify.css';
import '../styles/dashboard-calendar.scss';
import '../styles/v2/index.scss';
import {Fragment} from 'react';
import Head from 'next/head';
import {ToastContainer, Slide} from 'react-toastify';
import type {Props} from '^types/page';
import {RecoilRoot} from 'recoil';
import {accessLog2} from '^utils/log';

function MyApp(props: Props) {
    const {Component, pageProps} = props;
    // adjust accordingly if you disabled a layout rendering option
    const getLayout = Component.getLayout ?? ((page) => page);
    const Layout = Component.layout ?? Fragment;
    accessLog2(props);

    return (
        <RecoilRoot>
            <Head>
                <title>Scordi | 똑똑한 팀을 위한 SaaS 관리 솔루션</title>
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1.0, maximum-scale=1, user-scalable=no"
                />
            </Head>
            <Layout>{getLayout(<Component {...pageProps} />)}</Layout>
            <ToastContainer
                position="bottom-center"
                autoClose={3000}
                limit={1}
                hideProgressBar
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
                transition={Slide}
            />
        </RecoilRoot>
    );
}

export default MyApp;
