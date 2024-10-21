import React from 'react';
import {TypeformCdnScript} from './typeform';
import {GoogleAnalyticsCdnScript} from './google-analytics/GoogleAnalyticsCdnScript';
import {HotJarCdnScript} from './hotjar/HotJarCdnScript';
import {FacebookPixelCdnScript} from './facebook-pixel/FacebookPixelCdnScript';
import {ChannelTalkCDN} from './channel-talk/ChannelTalkCDN';
import {MeasuredInstall} from './measured';
import {StepByInstall} from './step-by';
import {stepByKey} from '^config/environments';

export default function ExternalCDNScripts() {
    return (
        <>
            <FacebookPixelCdnScript />
            <GoogleAnalyticsCdnScript />
            <HotJarCdnScript />
            <TypeformCdnScript />
            {typeof window !== 'undefined' && <ChannelTalkCDN />}
            <MeasuredInstall />
            {stepByKey && <StepByInstall />}
        </>
    );
}
