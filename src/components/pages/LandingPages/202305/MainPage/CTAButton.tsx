import React, {memo} from 'react';
import {useRouter} from 'next/router';
import {TastingPageRoute} from '^pages/tasting';

interface MainPageCTAButtonProps {
    reverseColor?: boolean;
    useArrow?: boolean;
    mobileShow?: boolean;
    aos?: boolean;
}

export const MainPageCTAButton = memo((props: MainPageCTAButtonProps) => {
    const router = useRouter();
    const {reverseColor = false, useArrow = false, mobileShow = false, aos = true} = props;

    const dataAos: any = {};
    if (aos) {
        dataAos['data-aos'] = 'fade-up';
        dataAos['data-aos-anchor-placement'] = 'center-bottom';
    }

    return (
        <button
            {...dataAos}
            onClick={() => router.push(TastingPageRoute.path())}
            className={`btn btn-lg btn-outline shadow-2xl font-medium normal-case rounded-2xl mb-3 space-x-4 bg-white border-scordi-200 !text-scordi hover:border-scordi-200 hover:bg-scordi-light-100 focus:bg-blue-50 active:bg-scordi-light-100 ${
                mobileShow ? '' : 'hidden sm:inline-flex'
            }`}
        >
            <img src="https://www.svgrepo.com/show/355037/google.svg" className="w-6 h-6" alt="" />
            <span>우리 팀 계정 알아보기</span>
            {/*<span>Google 계정으로 시작하기</span>*/}
        </button>
    );
});

export const MainPageCTAButtonMobile = memo((props: MainPageCTAButtonProps) => {
    const router = useRouter();
    const {reverseColor = false, useArrow = false, mobileShow = false, aos = true} = props;

    const dataAos: any = {};
    if (aos) {
        dataAos['data-aos'] = 'fade-up';
        dataAos['data-aos-anchor-placement'] = 'center-bottom';
    }

    return (
        <button
            onClick={() => router.push(TastingPageRoute.path())}
            className={`sm:hidden btn btn-lg btn-block rounded-none font-medium sticky bottom-0 normal-case space-x-4 bg-white !text-scordi border-scordi-200 border-x-0 border-b-0 hover:bg-scordi-light-100 focus:bg-blue-50 active:bg-scordi-light-100`}
        >
            <img src="https://www.svgrepo.com/show/355037/google.svg" className="w-6 h-6" alt="" />
            <span>우리 팀 계정 알아보기</span>
            {/*<span>Google 계정으로 시작하기</span>*/}
        </button>
    );
});
