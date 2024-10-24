import {useEffect} from 'react';
import {channelTalkEnv} from '^config/environments';
import {BootOption} from './channel-talk.type';
import ChannelService from './channel-talk.service';
import {useRouter} from 'next/router';

interface ChannelTalkCDNOption {
    bootOption?: BootOption;
}

export function ChannelTalkCDN(props: ChannelTalkCDNOption) {
    const {bootOption} = props;
    const router = useRouter();

    useEffect(() => {
        if (!router.isReady) return;

        // not allowed in private tenant territory
        if (!ChannelService.isBooted) {
            ChannelService.loadScript();
            ChannelService.boot({
                pluginKey: channelTalkEnv.pluginKey,
                ...(bootOption || {}),
            });
        }
    }, [router.isReady]);

    return <></>;
}
