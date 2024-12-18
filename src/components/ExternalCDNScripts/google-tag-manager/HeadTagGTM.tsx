import {memo} from 'react';
import {appEnv, gtm_id, serviceHost} from '^config/environments';

export const HeadTagGTM = memo(function HeadTagGTM() {
    return appEnv === 'production' && serviceHost === 'https://scordi.io' ? (
        <>
            <script
                data-component="Google Tag Manager"
                dangerouslySetInnerHTML={{
                    __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${gtm_id}');`,
                }}
            />
        </>
    ) : (
        <></>
    );
});
