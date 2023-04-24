import React, {memo} from 'react';
import {LandingPageForMarketerCTAButton} from './CTAButton';

export const LandingPageForMarketerHeader = memo(() => {
    return (
        <div className="hero mb-[100px]" style={{minHeight: '80vh'}}>
            <div className="hero-content py-16 sm:py-0 flex-col lg:flex-row-reverse">
                <img
                    src="https://framerusercontent.com/images/CLQDm6WfxBICz2mxLDwMRrbRzSo.png?scale-down-to=1024"
                    className="w-[66%] rounded-lg relative top-[100px] hidden sm:block"
                />
                <div>
                    <h1 className="text-4xl sm:text-5xl font-bold leading-snug mb-6">
                        마케팅 비용관리,
                        <br /> 스코디로 시작하세요.
                    </h1>
                    <p className="text-lg sm:text-xl text-gray-500 mb-10" style={{lineHeight: '1.75'}}>
                        마케터가 원하는 매체별 예산 관리의 모든 것, <br /> 연동부터 운영까지 엑셀 없이 1분만에
                        끝내보세요.
                    </p>
                    <LandingPageForMarketerCTAButton />
                </div>
                <img
                    src="https://framerusercontent.com/images/CLQDm6WfxBICz2mxLDwMRrbRzSo.png?scale-down-to=1024"
                    className="relative sm:hidden"
                />
            </div>
        </div>
    );
});
