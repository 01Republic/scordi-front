import React, {memo, useState} from 'react';
import {useRouter} from 'next/router';
import {CreditCard} from 'lucide-react';
import {useOrgIdParam} from '^atoms/common';
import {OrgCreditCardNewPageRoute} from '^pages/orgs/[id]/creditCards/new';
import {OrgAssetsCreateMethodSelectPageRoute} from '^pages/orgs/[id]/assets/new';
import {CardAutoCreateModal, CardCreateMethod, CardCreateMethodModal} from '^clients/private/_modals/credit-cards';
import {useDashboardCreditCardsSectionResultDto} from '^models/_dashboard/hook';
import {QuickButton} from './QuickButton';
import {useTranslation} from 'next-i18next';

export const AddCreditCardButton = memo(function AddCreditCardButton() {
    const orgId = useOrgIdParam();
    const router = useRouter();
    const {t} = useTranslation('dashboard');

    const {refetch} = useDashboardCreditCardsSectionResultDto(orgId);

    const [isCardCreateMethodModalOpen, setIsCardCreateMethodModalOpen] = useState(false);
    const [isCardAutoCreateModalOpen, setIsCardAutoCreateModalOpen] = useState(false);

    return (
        <>
            <QuickButton
                text={t('quickButtons.addPaymentMethod')}
                Icon={() => <CreditCard />}
                url={OrgAssetsCreateMethodSelectPageRoute.path(orgId)}
                // onClick={() => setIsCardCreateMethodModalOpen(true)}
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
