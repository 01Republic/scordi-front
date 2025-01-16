import React, {memo, useState} from 'react';
import {useRecoilValue} from 'recoil';
import {useRouter} from 'next/router';
import {GoCreditCard} from 'react-icons/go';
import {orgIdParamState} from '^atoms/common';
import {OrgCreditCardNewPageRoute} from '^pages/orgs/[id]/creditCards/new';
import {CardAutoCreateModal, CardCreateMethod, CardCreateMethodModal} from '^clients/private/_modals/credit-cards';
import {EmptyTableLayout} from '../EmptyTableLayout';

export const PaymentMethodEmptySection = memo(() => {
    const orgId = useRecoilValue(orgIdParamState);
    const router = useRouter();
    const [isCardCreateMethodModalOpen, setIsCardCreateMethodModalOpen] = useState(false);
    const [isCardAutoCreateModalOpen, setIsCardAutoCreateModalOpen] = useState(false);

    return (
        <>
            <EmptyTableLayout
                title="결제수단"
                Icon={() => <GoCreditCard />}
                onClick={() => setIsCardCreateMethodModalOpen(true)}
            />

            {/* 결제수단 등록 > 등록 방법 선택 */}
            <CardCreateMethodModal
                isOpened={isCardCreateMethodModalOpen}
                onClose={() => setIsCardCreateMethodModalOpen(false)}
                onSelect={(createMethod) => {
                    switch (createMethod) {
                        case CardCreateMethod.Auto:
                            return setIsCardAutoCreateModalOpen(true);
                        case CardCreateMethod.Manual:
                        default:
                            setIsCardAutoCreateModalOpen(false);
                            return router.push(OrgCreditCardNewPageRoute.path(orgId));
                    }
                }}
            />

            {/* 결제수단 등록 > 자동 등록 */}
            <CardAutoCreateModal
                isOpened={isCardAutoCreateModalOpen}
                onClose={() => {
                    setIsCardAutoCreateModalOpen(false);
                }}
                onCreate={() => {
                    setIsCardAutoCreateModalOpen(false);
                }}
            />
        </>
    );
});
PaymentMethodEmptySection.displayName = 'PaymentMethodEmptySection';
