import React, {memo} from 'react';
import {WithChildren} from '^types/global.type';
import {ChannelTalkHideStyle} from '^components/ExternalCDNScripts/channel-talk/ChannelTalkHideStyle';
import {FormProvider} from 'react-hook-form';
import {FormCardNumber} from '^pages/direct-pay/[secretCode]/FormCardNumber';
import {FormExpiryDate} from '^pages/direct-pay/[secretCode]/FormExpiryDate';

interface DPayPageLayoutProps extends WithChildren {
    channelTalk?: boolean;
}

export const DPayPageLayout = memo((props: DPayPageLayoutProps) => {
    const {children, channelTalk = false} = props;

    return (
        <div className="min-h-screen w-screen">
            {!channelTalk && <ChannelTalkHideStyle />}
            <div className="w-full mx-auto max-w-2xl h-screen flex items-stretch justify-stretch sm:py-10">
                <div className="w-full h-full md:h-[700px] md:shadow-lg md:rounded-3xl bg-white">{children}</div>
            </div>
        </div>
    );
});
DPayPageLayout.displayName = 'DPayPageLayout';
