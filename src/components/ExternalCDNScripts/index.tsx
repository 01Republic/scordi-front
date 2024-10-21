import React from 'react';
import {appEnv} from '^config/environments';
import {TypeformCdnScript} from './typeform';
import {GoogleAnalyticsCdnScript} from './google-analytics/GoogleAnalyticsCdnScript';
import {HotJarCdnScript} from './hotjar/HotJarCdnScript';
import {FacebookPixelCdnScript} from './facebook-pixel/FacebookPixelCdnScript';
import {ChannelTalkCDN} from './channel-talk/ChannelTalkCDN';
import {MeasuredInstall} from './measured';
import {StepByInstall} from './step-by';

export default function ExternalCDNScripts() {
    const allowEnv = (...envs: (typeof appEnv)[]) => envs.includes(appEnv);

    return (
        <>
            {allowEnv('production') && <FacebookPixelCdnScript />}
            {allowEnv('production') && <GoogleAnalyticsCdnScript />}
            {allowEnv('production') && <HotJarCdnScript />}
            <TypeformCdnScript />
            {typeof window !== 'undefined' && <ChannelTalkCDN />}
            {allowEnv('production') && <MeasuredInstall />}
            {allowEnv('production') && <StepByInstall />}
        </>
    );
}
