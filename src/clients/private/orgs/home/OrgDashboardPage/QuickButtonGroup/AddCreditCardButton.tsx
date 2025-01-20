import React, {memo, useState} from 'react';
import {useRecoilValue} from 'recoil';
import {useRouter} from 'next/router';
import {GoCreditCard} from 'react-icons/go';
import {orgIdParamState} from '^atoms/common';
import {OrgCreditCardNewPageRoute} from '^pages/orgs/[id]/creditCards/new';
import {CardAutoCreateModal, CardCreateMethod, CardCreateMethodModal} from '^clients/private/_modals/credit-cards';
import {QuickButton} from './QuickButton';
import {useDashboardCreditCardsSectionResultDto} from '^models/_dashboard/hook';

export const AddCreditCardButton = memo(function AddCreditCardButton() {
    const orgId = useRecoilValue(orgIdParamState);
    const router = useRouter();

    const {refetch} = useDashboardCreditCardsSectionResultDto(orgId);

    const [isCardCreateMethodModalOpen, setIsCardCreateMethodModalOpen] = useState(false);
    const [isCardAutoCreateModalOpen, setIsCardAutoCreateModalOpen] = useState(false);

    if (!orgId || isNaN(orgId)) return <></>;

    return (
        <>
            <QuickButton
                text="결제수단 추가"
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
                    refetch();
                }}
            />
        </>
    );
});
