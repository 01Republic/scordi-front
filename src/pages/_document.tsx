import Document, { Html, Head, Main, NextScript } from "next/document";
import ExternalCDNScripts from "../components/ExternalCDNScripts";

const ld = {
  "@context": "http://schema.org",
  "@type": "Organization",
  "url": "https://www.payplo.me",
  "name": "Team Payplo",
  "image": "https://www.payplo.me/logo.png",

  // 채널톡 참고
  // "contactPoint" : [
  //   {
  //     "@type": "ContactPoint",
  //     "telephone": "+82-",
  //     "contactType": "Customer Service",
  //     "contactOption": "TollFree",
  //     "areaServed": "KR"
  //   }
  // ],
  // "sameAs": [
  //   "https://www.youtube.com/channel/UCguz-PKTeNZ_v90yOvyKSog",
  //   "https://www.facebook.com/channel.korea/",
  //   "https://play.google.com/store/apps/details?id=com.zoyi.channel.desk.android",
  //   "https://itunes.apple.com/app/channel-desk/id1088828788?mt=8"
  // ]
};

export default class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <meta charSet="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1, user-scalable=no"/>
          <meta httpEquiv="X-UA-Compatible" content="IE=edge,chrome=1,IE=EmulateIE7"/>

          <link rel="icon" href="/logo-transparent.png" />
          <link rel="canonical" href="https://www.payplo.me"/>
          <meta name="description" content="모르는새 놓치고 있는 비용은 없나요? 우리 팀의 구독 서비스 한 곳에서 관리하세요. 똑똑한 팀을 위한 SaaS 관리 솔루션, Payplo - 구독 서비스 관리를 한 곳에서 쉽고 편하게"/>
          <meta name="keywords" content="페이플로,페이플로우,payplo,payflow,구독,비용관리,SaaS,사스,saas,tracker,통합관리,계정관리,구독모델,스타트업,인보이스,비용절약,지출관리,startup,manager,노션,notion,슬랙,slack,고위드"/>
          <meta name="author" content="Team Payplo"/>

          <meta property="og:title" content="Payplo | 똑똑한 팀을 위한 SaaS 관리 솔루션"/>
          <meta property="og:description" content="모르는새 놓치고 있는 비용은 없나요? 우리 팀의 구독 서비스 한 곳에서 관리하세요. 똑똑한 팀을 위한 SaaS 관리 솔루션, Payplo - 구독 서비스 관리를 한 곳에서 쉽고 편하게"/>
          <meta property="og:image" content="https://www.payplo.me/main-og.jpg"/>
          <meta property="og:type" content="website"/>
          <meta property="og:site_name" content="Payplo"/>
          <meta property="og:url" content="https://www.payplo.me"/>

          <meta name="twitter:title" content="Payplo | 똑똑한 팀을 위한 SaaS 관리 솔루션"/>
          <meta name="twitter:description" content="모르는새 놓치고 있는 비용은 없나요? 우리 팀의 구독 서비스 한 곳에서 관리하세요. 똑똑한 팀을 위한 SaaS 관리 솔루션, Payplo - 구독 서비스 관리를 한 곳에서 쉽고 편하게"/>
          <meta name="twitter:image" content="https://www.payplo.me/main-og.jpg"/>
          <meta name="twitter:card" content="summary_large_image"/>

          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: `${JSON.stringify(ld, null, 2)}` }} />

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

