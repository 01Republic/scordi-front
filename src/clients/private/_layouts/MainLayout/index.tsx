import {memo, useEffect, useState} from 'react';
import {WithChildren} from '^types/global.type';
import {Background} from './Background';
import {OrgTopBar} from './OrgTopBar';
import {TopNavBar} from './TopNavBar';
import {Footer} from '../_shared/Footer';
import {BaseLayout} from '^clients/private/_layouts/BaseLayout';
import {ChannelTalkHideStyle} from '^components/ExternalCDNScripts/channel-talk/ChannelTalkHideStyle';
import {TopLineBannerContainer} from '^models/TopLineBanner/components';
import {useSelectProducts} from '^models/Product/hook';

interface MainLayoutProps extends WithChildren {
    //
}

export const MainLayout = memo((props: MainLayoutProps) => {
    const {children} = props;
    const {selectedProducts, clearSelects} = useSelectProducts();

    useEffect(() => {
        if (selectedProducts.length) clearSelects();
    }, []);

    return (
        <BaseLayout>
            <Background />
            <ChannelTalkHideStyle />

            {/* Body */}
            <div className="relative min-h-screen">
                <TopLineBannerContainer />
                <OrgTopBar />
                <TopNavBar />

                {children}
                <Footer />
            </div>
        </BaseLayout>
    );
});
MainLayout.displayName = 'MainLayout';

export * from './MainContainer';
