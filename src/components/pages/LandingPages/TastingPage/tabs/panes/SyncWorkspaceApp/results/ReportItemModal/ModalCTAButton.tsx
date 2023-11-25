import React, {memo} from 'react';
import {useRouter} from 'next/router';
import {ModalLikeBottomBar} from '^v3/layouts/V3ModalLikeLayout.mobile/ModalLikeBottomBar';
import {SignPhoneAuthPageRoute} from '^pages/sign/phone';

export const ReportItemModalCTAButton = memo(function ReportItemModalCTAButton() {
    const router = useRouter();

    const onClick = () => {
        router.push(SignPhoneAuthPageRoute.path());
    };

    return (
        <ModalLikeBottomBar
            style={{
                backgroundImage: 'linear-gradient(transparent 0%, white 20%, white)',
            }}
        >
            <button onClick={onClick} className="btn btn-lg btn-block rounded-box btn-scordi-light-200 !text-gray-600">
                스코디로 관리 시작하기
            </button>
        </ModalLikeBottomBar>
    );
});
