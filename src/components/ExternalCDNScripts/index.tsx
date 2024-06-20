import React from 'react';
import {TypeformCdnScript} from './typeform';
import {GoogleAnalyticsCdnScript} from './google-analytics/GoogleAnalyticsCdnScript';
import {HotJarCdnScript} from './hotjar/HotJarCdnScript';
import {FacebookPixelCdnScript} from './facebook-pixel/FacebookPixelCdnScript';
import {ChannelTalkCDN} from './channel-talk/ChannelTalkCDN';
import {MeasuredInstall} from './measured/MeasuredInstall';

export default function ExternalCDNScripts() {
    return (
        <>
            <FacebookPixelCdnScript />
            <GoogleAnalyticsCdnScript />
            <HotJarCdnScript />
            <TypeformCdnScript />
            {typeof window !== 'undefined' && <ChannelTalkCDN />}
            <MeasuredInstall />
        </>
    );
}
