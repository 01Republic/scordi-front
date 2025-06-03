import {memo} from 'react';
import {WithChildren} from '^types/global.type';
import {BaseLayout} from '^clients/private/_layouts/BaseLayout';
import {ChannelTalkHideStyle} from '^components/ExternalCDNScripts/channel-talk/ChannelTalkHideStyle';

interface PureLayoutProps extends WithChildren {
    //
}

export const PureLayout = memo((props: PureLayoutProps) => {
    const {children} = props;

    return (
        <BaseLayout>
            <ChannelTalkHideStyle />

            {/* Body */}
            <div className="flex flex-col min-h-screen w-full mx-auto max-w-6xl px-4 py-14">{children}</div>
        </BaseLayout>
    );
});
