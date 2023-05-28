import '../styles/index.css';
import '../styles/grid.scss';
import '../styles/globals.scss';
import '../styles/mainPage.scss';
import '../styles/dashboard-calendar.scss';
import '../styles/content-layout/index.scss';
import '../styles/v2/index.scss';
import '../styles/button.scss';
import '../styles/tasting.scss';
import 'react-toastify/dist/ReactToastify.css';
import '@toast-ui/editor/dist/toastui-editor.css';
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
import React, {Fragment, Suspense} from 'react';
import Head from 'next/head';
import {ToastContainer, Slide} from 'react-toastify';
import type {Props} from '^types/page';
import {RecoilRoot} from 'recoil';
import {ChannelTalkCDN} from '^components/lib/channel-talk/ChannelTalkCDN';

function MyApp(props: Props) {
    const {Component, pageProps} = props;
    // adjust accordingly if you disabled a layout rendering option
    const getLayout = Component.getLayout ?? ((page) => page);
    const Layout = Component.layout ?? Fragment;
    // accessLog2(props);

    return (
        <RecoilRoot>
            <Head>
                <meta charSet="utf-8" />
                {/*<title>Scordi | 똑똑한 팀을 위한 SaaS 관리 솔루션</title>*/}
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1.0, maximum-scale=1, user-scalable=no"
                />
                <meta httpEquiv="X-UA-Compatible" content="IE=edge,chrome=1,IE=EmulateIE7" />

                <link rel="icon" href="/logo-transparent.png" />
                <link rel="canonical" href="https://scordi.io" />
            </Head>
            <ChannelTalkCDN />
            <Suspense fallback={<></>}>
                <Layout>{getLayout(<Component {...pageProps} />)}</Layout>
            </Suspense>
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
