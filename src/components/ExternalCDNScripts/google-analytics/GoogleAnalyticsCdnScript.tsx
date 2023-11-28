import {appEnv, ga_id, serviceHost} from '^config/environments';

// Google tag (gtag.js) -- production only
export function GoogleAnalyticsCdnScript() {
    return appEnv === 'production' && serviceHost === 'https://scordi.io' ? (
        <>
            <script id="cdn-ga-core" async src={`https://www.googletagmanager.com/gtag/js?id=${ga_id}`} />
            <script
                id="cdn-ga-config"
                dangerouslySetInnerHTML={{
                    __html: `
// Global site tag (gtag.js) - Google Analytics
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${ga_id}');
        `,
                }}
            />
        </>
    ) : (
        <></>
    );
}
