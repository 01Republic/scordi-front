import {memo} from 'react';
import {HomePageSection} from './HomePageSection';

export const Section4 = memo(() => {
    return (
        <div
            className="bg-center"
            style={{backgroundImage: `url(/home/202308/section4-bg.png)`, backgroundSize: '100% 100%'}}
        >
            <HomePageSection sectionClass="pt-[200px] pb-[100px]">
                <div>
                    <h2 className="text-center text-white text-5xl mb-[4rem]">똑똑한 팀은 이미 관리하고 있습니다.</h2>
                </div>

                {/* cta button */}
                <div className="flex items-center justify-center">
                    <button className="btn btn-scordi btn-lg">100개 고객사 한정 무료</button>
                </div>
            </HomePageSection>
        </div>
    );
});
