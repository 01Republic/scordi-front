import React, {memo} from 'react';
import {WithChildren} from '^types/global.type';
import {ChannelTalkHideStyle} from '^components/ExternalCDNScripts/channel-talk/ChannelTalkHideStyle';
import {FormProvider} from 'react-hook-form';
import {FormCardNumber} from '^pages/direct-pay/[secretCode]/FormCardNumber';
import {FormExpiryDate} from '^pages/direct-pay/[secretCode]/FormExpiryDate';

interface DPayPageLayoutProps extends WithChildren {
    channelTalk?: boolean;
    title: string;
}

export const DPayPageLayout = memo((props: DPayPageLayoutProps) => {
    const {children, channelTalk = false, title} = props;

    return (
        <div className="min-h-screen w-screen">
            {!channelTalk && <ChannelTalkHideStyle />}
            <div className="w-full mx-auto max-w-2xl h-screen flex items-stretch justify-stretch sm:py-10">
                <div className="w-full h-[700px] shadow-lg rounded-3xl bg-white">
                    <article className="p-8 flex flex-col lg:flex-row gap-8 lg:gap-16 h-full">
                        <section className="w-full lg:w-1/3">
                            <title className="flex flex-row lg:flex-col items-center lg:items-start">
                                <p className="font-semibold text-2xl">{title}</p>
                                <p className="font-semibold text-2xl ml-1.5 lg:mt-2 lg:ml-0">입력해주세요</p>
                            </title>
                            <p className="text-gray-400 my-1">주식회사 제로원리퍼블릭</p>
                            <p>결제플랜</p>
                            <p className="w-full h-8 bg-gray-200 rounded-md flex items-center justify-center">
                                <p>30,000</p>
                            </p>
                        </section>
                        <section className="w-full lg:w-2/3 h-full">{children}</section>
                    </article>
                </div>
            </div>
        </div>
    );
});
DPayPageLayout.displayName = 'DPayPageLayout';
