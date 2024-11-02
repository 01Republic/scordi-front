import React, {memo, useEffect} from 'react';
import {useRouter} from 'next/router';
import ChannelTalkService from './channel-talk.service';

interface ChannelTalkHideStyleProps {
    maxWidth?: string;
}

export const ChannelTalkHideStyle = memo((props: ChannelTalkHideStyleProps) => {
    const {maxWidth = '100vw'} = props;
    const router = useRouter();

    useEffect(() => {
        if (ChannelTalkService.isBooted) {
            ChannelTalkService.hideChannelButton();
            return () => {
                ChannelTalkService.showChannelButton();
            };
        }
    }, [router.isReady]);

    // return <></>;
    return (
        <style
            dangerouslySetInnerHTML={{
                __html: `
            @media (max-width: ${maxWidth}) {
                body > #ch-plugin {
                    display:none !important;
                }
            }
            `,
            }}
        />
    );
});
