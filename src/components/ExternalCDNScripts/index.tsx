import {TypeformCdnScript} from './typeform';
import {GoogleAnalyticsCdnScript} from './google-analytics/GoogleAnalyticsCdnScript';
import {HotJarCdnScript} from './hotjar/HotJarCdnScript';
import {FacebookPixelCdnScript} from './facebook-pixel/FacebookPixelCdnScript';

export default function ExternalCDNScripts() {
    return (
        <>
            <FacebookPixelCdnScript />
            <GoogleAnalyticsCdnScript />
            <HotJarCdnScript />
            <TypeformCdnScript />
        </>
    );
}
