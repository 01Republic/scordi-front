import React, {memo} from 'react';
import {WithChildren} from '^types/global.type';
import {USPSectionCentered} from '^components/pages/LandingPages/components';

export const HomePageSection3 = memo(() => {
    return (
        <USPSectionCentered
            title={
                <span data-aos="fade-up" data-aos-anchor-placement="center-bottom">
                    <span className="hidden sm:inline-block">
                        카드 내역만으로 찾기 어려웠던 <br /> 결제 조회, 스코디로 해결하세요
                    </span>
                    <span className="inline-block sm:hidden">
                        카드 내역만으로 찾기 <br /> 어려웠던 결제 조회,
                        <br /> 스코디로 해결하세요
                    </span>
                </span>
            }
            showCTA={false}
        >
            <div className="text-center" data-aos="fade-up" data-aos-anchor-placement="center-bottom">
                <div className="w-full px-8 pt-8 sm:pt-0">
                    <img
                        className="mx-auto"
                        src="/home/202305/tasting/section-3-left.png"
                        style={{maxHeight: '300px'}}
                    />
                </div>

                <div className="btn btn-block rounded-full sm:btn-lg bg-gray-200 hover:bg-gray-200 shadow text-xl sm:text-2xl font-bold text-gray-400">
                    흩어진 결제 영수증 일일이 찾기
                </div>
            </div>

            <div className="text-center" data-aos="fade-up" data-aos-anchor-placement="center-bottom">
                <div className="w-full px-8 pt-8 sm:pt-0">
                    <img
                        className="mx-auto"
                        src="/home/202305/tasting/section-3-right.png"
                        style={{maxHeight: '300px'}}
                    />
                </div>

                <div className="btn btn-block rounded-full sm:btn-lg bg-scordi-200 hover:bg-scordi-200 shadow text-xl sm:text-2xl font-bold text-scordi-600">
                    스코디로 한 번에 조회
                </div>
            </div>
        </USPSectionCentered>
    );
});
