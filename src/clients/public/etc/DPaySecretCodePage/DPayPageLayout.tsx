import React, {memo} from 'react';
import {WithChildren} from '^types/global.type';
import {ChannelTalkHideStyle} from '^components/ExternalCDNScripts/channel-talk/ChannelTalkHideStyle';

interface DPayPageLayoutProps extends WithChildren {
    channelTalk?: boolean;
}

export const DPayPageLayout = memo((props: DPayPageLayoutProps) => {
    const {children, channelTalk = false} = props;

    return (
        <div className="min-h-screen w-screen">
            {!channelTalk && <ChannelTalkHideStyle />}
            <div className="w-full mx-auto max-w-md h-screen flex items-stretch justify-stretch sm:py-10">
                <div className="bg-white w-full sm:shadow-lg sm:rounded-lg">{children}</div>
            </div>
        </div>
    );
});
DPayPageLayout.displayName = 'DPayPageLayout';
