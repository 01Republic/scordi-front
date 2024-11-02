import React, {memo} from 'react';
import {WithChildren} from '^types/global.type';
import {ChannelTalkHideStyle} from '^components/ExternalCDNScripts/channel-talk/ChannelTalkHideStyle';

interface DPayPageLayoutProps extends WithChildren {}

export const DPayPageLayout = memo((props: DPayPageLayoutProps) => {
    const {children} = props;

    return (
        <div className="min-h-screen w-screen">
            <div className="w-full mx-auto max-w-2xl min-h-screen flex items-stretch justify-stretch sm:py-10">
                <div className="w-full min-h-full md:min-h-[700px] md:shadow-lg md:rounded-3xl bg-white">
                    {children}
                </div>
            </div>
        </div>
    );
});
DPayPageLayout.displayName = 'DPayPageLayout';
