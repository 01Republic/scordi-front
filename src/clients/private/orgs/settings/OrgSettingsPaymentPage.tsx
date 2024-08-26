import React, {memo} from 'react';
import {OrgSettingsLayout} from '^clients/private/orgs/settings/OrgSettingsLayout';
import {EmptyTable} from '^clients/private/_components/table/EmptyTable';

export const OrgSettingsPaymentPage = memo(function () {
    const cardStyle = `border rounded-lg p-4 mb-6`;

    return (
        <OrgSettingsLayout>
            <div className={'text-xl font-bold my-4'}>구독 및 결제</div>
            <div className={cardStyle}>
                <div className={'flex justify-between items-center mb-4'}>
                    <div className={'font-bold'}>현재 플랜 정보</div>
                    <div>플랜 변경</div>
                </div>
                <div className={'p-4 bg-gray-50 flex justify-between items-center'}>
                    <div>무료</div>
                    <div>이용기간:</div>
                </div>
            </div>
            <div className={cardStyle}>
                <div className={'flex justify-between items-center mb-4'}>
                    <div className={'font-bold'}>카드 정보</div>
                    <div>플랜 변경</div>
                </div>
                <EmptyTable icon={'💳'} message="등록된 카드 정보가 없어요." />
            </div>
            <div className={cardStyle}>
                <div className={'flex justify-between items-center mb-4'}>
                    <div className={'font-bold'}>결제 환불 내역</div>
                </div>
                <EmptyTable icon={'📃'} message="결제/환불 내역이 없어요." />
            </div>
        </OrgSettingsLayout>
    );
});
