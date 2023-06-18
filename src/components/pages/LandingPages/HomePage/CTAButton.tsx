import React, {memo} from 'react';
import {WithChildren} from '^types/global.type';
import {googleAuthForGmail} from '^api/tasting.api';
import {BetaUserApplyCTAButton} from '^components/pages/LandingPages/components';
import {TastingPageRoute} from '^pages/tasting';
import {useRouter} from 'next/router';

type HomePageCTAButtonProps = {
    text?: string;
} & WithChildren;

export const HomePageCTAButton = memo((props: HomePageCTAButtonProps) => {
    const {text, children} = props;
    const router = useRouter();

    // TODO: 사전신청 버튼 잠시 남겨움. (지워야됨)
    // return <BetaUserApplyCTAButton aos={false} mobileShow={true} />;

    return (
        <button
            onClick={() => googleAuthForGmail(TastingPageRoute.path(), router.locale)}
            className="btn_google_signin_light w-[280px] h-[64px]"
        />
    );
    // TODO: 종국에는 이걸로 바꿔야 됨.
    // return (
    //     <button
    //         onClick={() => googleAuthForGmail()}
    //         className="btn btn-lg btn-outline shadow rounded-2xl font-medium normal-case mb-3 space-x-4 bg-white border-slate-200 text-slate-700 hover:bg-white hover:border-primary hover:text-slate-700 focus:bg-blue-50 active:bg-primary-100"
    //     >
    //         <img src="https://www.svgrepo.com/show/355037/google.svg" className="w-6 h-6" alt="" />
    //         <span>{text || 'Google 계정으로 시작하기'}</span>
    //     </button>
    // );
});

export const HomePageCTAButton2 = memo((props: HomePageCTAButtonProps) => {
    const {text} = props;

    // return (
    //     <button onClick={googleAuthForGmail} className="btn btn-lg btn-scordi-500 rounded-2xl shadow-xl">
    //         {text}
    //     </button>
    // );
    return <BetaUserApplyCTAButton aos={false} mobileShow={true} text={text} />;
});
