import {memo, useEffect} from 'react';
import {WithChildren} from '^types/global.type';
import {BaseLayout} from '^clients/private/_layouts/BaseLayout';
import {ChannelTalkHideStyle} from '^components/ExternalCDNScripts/channel-talk/ChannelTalkHideStyle';

interface AssetCreateLayoutProps extends WithChildren {
    //
}

export const AssetCreateLayout = memo((props: AssetCreateLayoutProps) => {
    const {children} = props;

    return (
        <BaseLayout>
            <ChannelTalkHideStyle />

            {/* Body */}
            <div className="relative min-h-screen">{children}</div>
        </BaseLayout>
    );
});
AssetCreateLayout.displayName = 'AssetCreateLayout';
