import '../styles/packs/app.scss';
import '../styles/packs/admin.scss';
import 'react-toastify/dist/ReactToastify.css';
import '@toast-ui/editor/dist/toastui-editor.css';
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
import React, {Fragment, Suspense} from 'react';
import {ToastContainer, Slide} from 'react-toastify';
import type {Props} from '^types/page';
import {RecoilRoot} from 'recoil';
import {appWithTranslation} from 'next-i18next';
import {SEO} from '^components/SEO';
import {OnResizeProvider} from '^components/util/onResize2';
import ExternalCDNScripts from '^components/ExternalCDNScripts';

function MyApp(props: Props) {
    const {Component, pageProps} = props;
    // adjust accordingly if you disabled a layout rendering option
    const getLayout = Component.getLayout ?? ((page) => page);
    const Layout = Component.layout ?? Fragment;
    // accessLog2(props);

    return (
        <RecoilRoot>
            <SEO />
            <OnResizeProvider />
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
            <ExternalCDNScripts />
        </RecoilRoot>
    );
}

export default appWithTranslation(MyApp);
