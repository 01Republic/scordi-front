import React, {memo} from 'react';
import {WithChildren} from '^types/global.type';
import {googleAuthForGmail} from '^api/tasting.api';

type HomePageCTAButtonProps = {
    text?: string;
} & WithChildren;

export const HomePageCTAButton = memo((props: HomePageCTAButtonProps) => {
    const {text, children} = props;

    return (
        <button
            onClick={googleAuthForGmail}
            className="btn btn-lg btn-outline shadow rounded-2xl font-medium normal-case mb-3 space-x-4 bg-white border-slate-200 text-slate-700 hover:bg-white hover:border-primary hover:text-slate-700 focus:bg-blue-50 active:bg-primary-100"
        >
            <img src="https://www.svgrepo.com/show/355037/google.svg" className="w-6 h-6" alt="" />
            <span>{text || 'Google 계정으로 시작하기'}</span>
        </button>
    );
});

export const HomePageCTAButton2 = memo((props: HomePageCTAButtonProps) => {
    const {text} = props;

    return (
        <button onClick={googleAuthForGmail} className="btn btn-lg btn-scordi-500 rounded-2xl shadow-xl">
            {text}
        </button>
    );
});
