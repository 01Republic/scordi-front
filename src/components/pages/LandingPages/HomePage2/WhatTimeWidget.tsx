import {memo} from 'react';
import {HomePageSection} from '^components/pages/LandingPages/HomePage2/HomePageSection';

export const WhatTimeWidget = memo(() => {
    const widgetHtml = `
    <!-- WhatTime embed widget begin --> 
      <div 
        class="whattime-inline-widget" 
        data-url="https://whattime.co.kr/scordi_fred/onboarding"
        data-text-color="#1a1a1a" 
        data-button-color="#6454ff" 
        data-background-color="#ffffff" 
        style="min-width: 320px; height: 690px;">
      </div>
      <link href="https://assets.whattime.co.kr/widget/widget.css" rel="stylesheet">
      <script src="https://assets.whattime.co.kr/widget/widget.js" type="text/javascript" async></script>
    <!-- WhatTime embed widget end -->
    `;

    return (
        <>
            <HomePageSection sectionClass="bg-white" containerClass="border-t">
                <div className="text-center mb-1">
                    <h2 className="text-center text-[25px] sm:text-4xl mb-[1rem] sm:mb-[2rem]">
                        <span className="block">
                            <span className="text-scordi">스코디</span> 팀을 만나보세요
                        </span>
                    </h2>
                    <p className="text-gray-500 text-[18px] sm:text-[25px]">
                        커피챗부터 스코디 온보딩까지, 기다리고 있어요!
                    </p>
                </div>
            </HomePageSection>

            <div
                dangerouslySetInnerHTML={{
                    __html: widgetHtml,
                }}
            ></div>
        </>
    );
});
