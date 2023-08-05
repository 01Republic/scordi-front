import {memo} from 'react';
import {HomePageSection} from './HomePageSection';

export const Section3b = memo(() => {
    return (
        <HomePageSection sectionClass="bg-white">
            <div className="sm:flex gap-8 relative">
                <div className="sm:w-[45%] text-left">
                    <p className="font-semibold text-scordi-light text-xl mb-4">입ㆍ퇴사 관리</p>

                    <p className="font-bold text-4xl leading-snug mb-4">
                        지금까지 경험하지 못한
                        <br />
                        원클릭 입퇴사 계정 관리
                    </p>

                    <button className="btn btn-lg !bg-black !text-white mb-12">100개 고객사 한정 무료</button>
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
