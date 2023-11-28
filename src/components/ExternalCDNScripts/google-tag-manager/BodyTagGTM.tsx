import {memo} from 'react';
import {gtm_id} from '^config/environments';

export const BodyTagGTM = memo(function BodyTagGTM() {
    return (
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
    );
});
