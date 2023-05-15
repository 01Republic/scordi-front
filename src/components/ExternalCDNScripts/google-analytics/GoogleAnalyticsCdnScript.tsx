import {GA_ID} from './constants';
import {appEnv, serviceHost} from '^config/environments';

export function GoogleAnalyticsCdnScript() {
    return appEnv === 'production' && serviceHost === 'https://scordi.io' ? (
        <>
            <script id="cdn-ga-core" async src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} />
            <script
                id="cdn-ga-config"
                dangerouslySetInnerHTML={{
                    __html: `
// Global site tag (gtag.js) - Google Analytics
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${GA_ID}');
        `,
                }}
            />
        </>
    ) : (
        <></>
    );
}
