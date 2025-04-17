import {memo} from 'react';
import {WithChildren} from '^types/global.type';
import {BaseLayout} from '^clients/private/_layouts/BaseLayout';
import {ChannelTalkHideStyle} from '^components/ExternalCDNScripts/channel-talk/ChannelTalkHideStyle';

interface PureCenterLayoutProps extends WithChildren {
    //
}

export const PureCenterLayout = memo((props: PureCenterLayoutProps) => {
    const {children} = props;

    return (
        <BaseLayout>
            <ChannelTalkHideStyle />

            {/* Body */}
            <div className="flex items-center justify-center min-h-screen w-full">{children}</div>
        </BaseLayout>
    );
});
