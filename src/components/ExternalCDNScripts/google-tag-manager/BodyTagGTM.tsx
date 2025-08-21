import {memo} from 'react';
import {appEnv, gtm_id, serviceHost} from '^config/environments';

export const BodyTagGTM = memo(function BodyTagGTM() {
    return appEnv === 'production' && serviceHost.startsWith('https://') && serviceHost.endsWith('scordi.io') ? (
        <>
            {/* Google Tag Manager (noscript) */}
            <noscript data-component="Google Tag Manager (noscript)">
                <iframe
                    src={`https://www.googletagmanager.com/ns.html?id=${gtm_id}`}
                    height="0"
                    width="0"
                    style={{display: 'none', visibility: 'hidden'}}
                />
            </noscript>
            {/* End Google Tag Manager (noscript) */}
        </>
    ) : (
        <></>
    );
});
