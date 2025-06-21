import {memo, useEffect} from 'react';
import {WithChildren} from '^types/global.type';
import {BaseLayout} from '^clients/private/_layouts/BaseLayout';
import {ChannelTalkHideStyle} from '^components/ExternalCDNScripts/channel-talk/ChannelTalkHideStyle';
import {TopLineBannerContainer} from '^models/TopLineBanner/components';
import {useSelectProducts} from '^models/Product/hook';
import {useFlashMessagesConnector} from '^models/_notification/NotificationSession/hooks';
import {Footer} from '../_shared/Footer';
import {Background} from './Background';
import {OrgTopBar} from './OrgTopBar';
import {TopNavBar} from './TopNavBar';
import {FlashNotificationMessageContainer} from './FlashNotificationMessageContainer';

interface MainLayoutProps extends WithChildren {
    //
}

export const MainLayout = memo((props: MainLayoutProps) => {
    const {children} = props;
    const {selectedProducts, clearSelects} = useSelectProducts();
    useFlashMessagesConnector();

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
                <FlashNotificationMessageContainer />

                {children}
                <Footer />
            </div>
        </BaseLayout>
    );
});
MainLayout.displayName = 'MainLayout';

export * from './MainContainer';
