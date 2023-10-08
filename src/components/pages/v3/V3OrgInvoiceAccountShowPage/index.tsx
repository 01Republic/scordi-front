import React, {memo} from 'react';
import {V3ModalLikeLayoutMobile} from '^v3/layouts/V3ModalLikeLayout.mobile';
import {MobileSection} from '../share/sections/MobileSection';
import {useCurrentInvoiceAccount} from './atom';
import {InformationPanel} from './InformationPanel';
import {SubscriptionPanel} from './SubscriptionPanel';

export const V3OrgInvoiceAccountShowPage = memo(() => {
    const {currentInvoiceAccount} = useCurrentInvoiceAccount();

    return (
        <V3ModalLikeLayoutMobile title={`결제 수신 계정`} modals={[]}>
            <MobileSection.List style={{minHeight: 'calc(100vh - 50px)'}}>
                {/* 계정 정보 */}
                <InformationPanel />

                {/* 연동된 구독 목록 */}
                <SubscriptionPanel />

                {/* 하단 여백 */}
                <MobileSection.Item noStyle className="px-4 mb-16 text-center">
                    <button className="btn btn-error btn-outline">계정 삭제</button>
                </MobileSection.Item>
            </MobileSection.List>
        </V3ModalLikeLayoutMobile>
    );
});
