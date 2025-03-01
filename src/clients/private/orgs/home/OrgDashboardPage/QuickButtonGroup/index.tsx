import React, {memo} from 'react';
import {AddSubscriptionButton} from './AddSubscriptionButton';
import {AddCreditCardButton} from './AddCreditCardButton';
import {AddInvoiceAccountButton} from './AddInvoiceAccountButton';
import {AddTeamMemberButton} from './AddTeamMemberButton';

export const QuickButtonGroup = memo(() => {
    return (
        <div className="flex gap-3 overflow-hidden overflow-x-auto" style={{scrollbarWidth: 'none'}}>
            {/*구독 추가*/}
            <AddSubscriptionButton />

            {/* 결제수단 추가 */}
            <AddCreditCardButton />

            {/* 청구서 메일 계정 추가 */}
            <AddInvoiceAccountButton />

            {/* 구성원 추가 */}
            <AddTeamMemberButton />
        </div>
    );
});
