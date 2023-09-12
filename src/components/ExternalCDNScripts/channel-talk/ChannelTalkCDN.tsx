import {useEffect} from 'react';
import {channelTalkEnv} from '^config/environments';
import {BootOption} from './channel-talk.type';
import ChannelService from './channel-talk.service';

interface ChannelTalkCDNOption {
    bootOption?: BootOption;
}

export function ChannelTalkCDN(props: ChannelTalkCDNOption) {
    const {bootOption} = props;

    useEffect(() => {
        ChannelService.loadScript();
        ChannelService.boot({
            pluginKey: channelTalkEnv.pluginKey,
            ...(bootOption || {}),
        });
    }, []);

    return <></>;
}
