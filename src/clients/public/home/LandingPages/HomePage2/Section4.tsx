import {memo} from 'react';
import {HomePageSection} from './HomePageSection';
import {CTAButton} from '^clients/public/home/LandingPages/HomePage2/CTAButton';

export const Section4 = memo(() => {
    return (
        <div className="bg-center">
            <HomePageSection sectionClass="bg-gray-100">
                <div className="text-center mb-[3rem]">
                    <h2 className="text-[32px] sm:text-[4em] leading-[1.2em] mb-[1rem] sm:mb-[2rem]">
                        새로운 SaaS 관리의 시작
                    </h2>
                    <p className="text-gray-500 text-[18px] sm:text-[25px]">클릭 한 번으로 시작해보세요</p>
                </div>

                {/* cta button */}
                <div className="flex items-center justify-center">
                    <CTAButton className="btn btn-scordi btn-lg" />
                </div>
            </HomePageSection>
        </div>
    );
});
