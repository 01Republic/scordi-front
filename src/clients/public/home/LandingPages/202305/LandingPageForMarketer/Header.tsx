import React, {memo} from 'react';
import {BetaUserApplyCTAButton} from '../../components';

export const LandingPageForMarketerHeader = memo(() => {
    return (
        <div
            className="hero pb-[100px]"
            style={{
                minHeight: '80vh',
                // background: 'rgb(92,95,238)',
                background:
                    'linear-gradient(9deg, rgba(92,95,238,0.1951374299719888) 0%, rgba(92,95,238,0.20354079131652658) 30%, rgba(255,255,255,0) 60%, rgba(255,255,255,0) 100%)',
            }}
        >
            <div className="hero-content py-16 md:py-0 flex-col md:flex-row-reverse">
                <img
                    src="https://framerusercontent.com/images/CLQDm6WfxBICz2mxLDwMRrbRzSo.png?scale-down-to=1024"
                    className="w-[66%] rounded-lg relative top-[100px] hidden md:block"
                />
                <div>
                    <h1 className="text-4xl md:text-5xl font-bold leading-snug mb-6">
                        마케팅 비용관리,
                        <br /> <span className="text-scordi">스코디</span>로 시작하세요.
                    </h1>
                    <p className="text-lg md:text-xl text-gray-500 mb-10" style={{lineHeight: '1.75'}}>
                        마케터가 원하는 매체별 예산 관리의 모든 것, <br /> 연동부터 운영까지 엑셀 없이 1분만에
                        끝내보세요.
                    </p>
                    <BetaUserApplyCTAButton aos={false} />
                </div>
                <img
                    src="https://framerusercontent.com/images/CLQDm6WfxBICz2mxLDwMRrbRzSo.png?scale-down-to=1024"
                    className="relative md:hidden"
                />
            </div>
        </div>
    );
});
