import {memo} from 'react';
import {HomePageSection} from './HomePageSection';

export const Section3a = memo(() => {
    return (
        <HomePageSection sectionClass="bg-white overflow-hidden">
            <div className="sm:flex gap-8 relative">
                <div className="hidden sm:block sm:flex-1">
                    <div className="card shadow-2xl">
                        <div className="card-body">
                            <img
                                src="/home/202308/section3a-img1.png"
                                alt="section3a-screen"
                                loading="lazy"
                                draggable={false}
                            />
                        </div>
                    </div>

                    <div className="absolute -left-[5%] -right-[5%]" style={{top: '58%'}}>
                        <img
                            src="/home/202308/section3a-img2.png"
                            alt="section3a-unit"
                            loading="lazy"
                            draggable={false}
                        />
                    </div>
                </div>

                <div className="w-full sm:w-[45%] sm:text-right">
                    <p className="font-semibold text-scordi-light text-[16px] sm:text-xl mb-4">SaaS 지출ㆍ팀원 관리</p>

                    <p className="font-bold text-[25px] sm:text-4xl leading-snug mb-4">
                        누가 쓰고 얼마 빠지는지
                        <br />
                        실시간으로 한 눈에 파악
                    </p>

                    <button className="btn !bg-black !text-white">100개 고객사 한정 무료</button>
                </div>

                <div className="block sm:hidden relative pt-12">
                    <div className="card shadow-2xl">
                        <div className="card-body">
                            <img
                                src="/home/202308/section3a-img1-m.png"
                                alt="section3a-screen"
                                loading="lazy"
                                draggable={false}
                            />
                        </div>
                    </div>

                    <div className="absolute -left-4 -right-4" style={{top: '34%'}}>
                        <img
                            src="/home/202308/section3a-img2-m.png"
                            alt="section3a-unit"
                            loading="lazy"
                            className="w-full"
                            draggable={false}
                        />
                    </div>
                </div>
            </div>
        </HomePageSection>
    );
});
