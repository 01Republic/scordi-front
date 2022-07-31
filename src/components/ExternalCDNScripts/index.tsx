import { TypeformCdnScript } from "./typeform/TypeformCdnScript";
import { GoogleAnalyticsCdnScript } from "./google-analytics/GoogleAnalyticsCdnScript";
import { HotJarCdnScript } from "./hotjar/HotJarCdnScript";

export default function ExternalCDNScripts() {
  return (
    <>
      <GoogleAnalyticsCdnScript />
      <HotJarCdnScript />
      <TypeformCdnScript />
    </>
  )
}
