import {memo} from 'react';
import {HomePageSection} from './HomePageSection';
import {CTAButton} from '^clients/public/home/LandingPages/HomePage2/CTAButton';

export const Section3b = memo(() => {
    return (
        <HomePageSection sectionClass="bg-white">
            <div className="sm:flex gap-8 relative">
                <div className="sm:w-[45%] text-left">
                    <p className="font-semibold text-scordi-light text-[16px] sm:text-xl mb-4">입ㆍ퇴사 관리</p>

                    <p className="font-bold text-[25px] sm:text-4xl leading-snug mb-4">
                        팀원 계정 연동ㆍ해제도
                        <br />
                        클릭 한 번이면 해결
                    </p>

                    <CTAButton className="btn !bg-black !text-white mb-12" />
                </div>

                <div className="flex-1">
                    <div className="card border-none">
                        <div className="card-body p-0">
                            <img
                                src="/home/202308/section3b-img.png"
                                alt="section3b-img"
                                loading="lazy"
                                draggable={false}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </HomePageSection>
    );
});
