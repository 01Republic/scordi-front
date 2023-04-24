import React, {memo} from 'react';
import {BsArrowRight} from '^components/react-icons';

interface LandingPageForMarketerCTAButtonProps {
    reverseColor?: boolean;
    useArrow?: boolean;
    mobileShow?: boolean;
}

export const LandingPageForMarketerCTAButton = memo((props: LandingPageForMarketerCTAButtonProps) => {
    const {reverseColor = false, useArrow = false, mobileShow = false} = props;
    return (
        <label
            htmlFor="my-modal-4"
            className={`btn ${reverseColor ? 'btn-white border border-gray-300' : 'btn-primary'} ${
                mobileShow ? '' : 'hidden sm:inline-flex'
            } btn-lg rounded-2xl`}
        >
            <span>사전알림 신청하기</span>
            {useArrow && <BsArrowRight size={20} className="ml-2" />}
        </label>
    );
});

export const LandingPageForMarketerCTAButtonMobile = memo((props: LandingPageForMarketerCTAButtonProps) => {
    const {reverseColor = false, useArrow = false} = props;
    return (
        <label
            htmlFor="my-modal-4"
            className={`btn ${
                reverseColor ? 'btn-white border border-gray-300' : 'btn-primary'
            } sm:hidden btn-lg btn-block rounded-none fixed bottom-0 shadow-2xl`}
        >
            <span>사전알림 신청하기</span>
            <BsArrowRight size={20} className="ml-2" />
        </label>
    );
});
