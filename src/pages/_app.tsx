import '@mantine/core/styles.css';
import '@mantine/dates/styles.css';
import '../styles/packs/app.scss';
import '../styles/packs/admin.scss';
import 'react-toastify/dist/ReactToastify.css';
import '@toast-ui/editor/dist/toastui-editor.css';
import 'tippy.js/dist/tippy.css'; // optional
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
import 'animate.css';
import React, {Fragment, Suspense} from 'react';
import {RecoilRoot} from 'recoil';
import {appWithTranslation} from 'next-i18next';
import {ToastContainer, Slide} from 'react-toastify';
import {Toaster} from 'react-hot-toast';
import type {Props} from '^types/page';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {SEO} from '^components/SEO';
import {OnResizeProvider} from '^components/util/onResize2';
import ExternalCDNScripts from '^components/ExternalCDNScripts';
import {MantineProvider} from '@mantine/core';

function MyApp(props: Props) {
    const {Component, pageProps} = props;
    // adjust accordingly if you disabled a layout rendering option
    const getLayout = Component.getLayout ?? ((page) => page);
    const Layout = Component.layout ?? Fragment;
    // accessLog2(props);
    const queryClient = new QueryClient();

    return (
        <QueryClientProvider client={queryClient}>
            <RecoilRoot>
                <MantineProvider>
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
                    <div id="dropdown-portal" />
                    <Toaster
                        containerStyle={{bottom: '15vh'}}
                        toastOptions={{
                            position: 'bottom-center',
                            style: {background: '#333', color: '#fff'},
                            // duration: 1000 * 5,
                        }}
                    />

                    <ExternalCDNScripts />
                </MantineProvider>
            </RecoilRoot>
        </QueryClientProvider>
    );
}

export default appWithTranslation(MyApp);
