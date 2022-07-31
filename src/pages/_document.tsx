import Document, { Html, Head, Main, NextScript } from "next/document";
import ExternalCDNScripts from "../components/ExternalCDNScripts";

export default class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <meta charSet="utf-8" />
          <meta name="description" content="똑똑한 팀을 위한 SaaS 관리 플랫폼 | Payplo - 구독 서비스 관리를 한 곳에서 쉽고 편하게" />
          <link rel="icon" href="/logo-transparent.png" />

          <ExternalCDNScripts />
        </Head>

        <body>
        <Main />
        <NextScript />
        </body>
      </Html>
    );
  }
}

