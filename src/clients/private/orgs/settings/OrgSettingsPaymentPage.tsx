import React, {memo, useEffect} from 'react';
import {useRouter} from 'next/router';
import {useRecoilValue} from 'recoil';
import {toast} from 'react-toastify';
import {OrgSettingsLayout} from '^clients/private/_layouts/OrgSettingsLayout';
import {EmptyTable} from '^clients/private/_components/table/EmptyTable';
import {orgIdParamState} from '^atoms/common';
import {OrgSettingsPaymentPageRoute} from '^pages/orgs/[id]/settings/payments';
import {loadTossPayments} from '@tosspayments/tosspayments-sdk';
import {tossPaymentsKey} from '^config/environments';
import {useCurrentUser} from '^models/User/hook';
import {SelectPlanModal} from '^clients/private/orgs/settings/payments/SelectPlanModal';
import {useTossPayments} from '^hooks/useTossPayments';

export const OrgSettingsPaymentPage = memo(function () {
    const orgId = useRecoilValue(orgIdParamState);
    const {startBilling} = useTossPayments();
    const [isSelectPlanModalOpened, setIsSelectPlanModalOpened] = React.useState<boolean>(false);

    const cardStyle = `border rounded-lg p-4 mb-6`;

    return (
        <>
            <OrgSettingsLayout
                breadcrumbPath={{
                    text: '결제 관리',
                    active: true,
                    href: OrgSettingsPaymentPageRoute.path(orgId),
                }}
            >
                <div className={'text-xl font-bold my-4'}>구독 및 결제</div>
                <div className={cardStyle}>
                    <div className={'flex justify-between items-center mb-4'}>
                        <div className={'font-bold'}>현재 플랜 정보</div>
                        <button
                            className={'px-4 py-2 text-gray-400 border rounded-md hover:bg-gray-50'}
                            onClick={() => setIsSelectPlanModalOpened(true)}
                        >
                            플랜 변경
                        </button>
                    </div>
                    <div className={'p-4 bg-gray-50 flex justify-between items-center'}>
                        <div>무료</div>
                        <div>이용기간:</div>
                    </div>
                </div>
                <div className={cardStyle}>
                    <div className={'flex justify-between items-center mb-4'}>
                        <div className={'font-bold'}>카드 정보</div>
                        <button
                            className={'px-4 py-2 text-gray-400 border rounded-md hover:bg-gray-50'}
                            onClick={() => startBilling()}
                        >
                            카드 변경
                        </button>
                    </div>
                    <EmptyTable message="등록된 카드 정보가 없어요." />
                </div>
                <div className={cardStyle}>
                    <div className={'flex justify-between items-center mb-4'}>
                        <div className={'font-bold'}>결제 환불 내역</div>
                    </div>
                    <EmptyTable message="결제/환불 내역이 없어요." />
                </div>
            </OrgSettingsLayout>

            {/*  Modal  */}
            <SelectPlanModal isOpened={isSelectPlanModalOpened} onClose={() => setIsSelectPlanModalOpened(false)} />
        </>
    );
});
