import React, {memo, useState} from 'react';
import {useRouter} from 'next/router';
import {GoCreditCard} from 'react-icons/go';
import {useRecoilValue} from 'recoil';
import {useDashboardCreditCardsSectionResultDto} from '^models/_dashboard/hook';
import {orgIdParamState} from '^atoms/common';
import {currencyFormat, unitFormat} from '^utils/number';
import {OrgCreditCardListPageRoute} from '^pages/orgs/[id]/creditCards';
import {OrgCreditCardNewPageRoute} from '^pages/orgs/[id]/creditCards/new';
import {CardAutoCreateModal, CardCreateMethod, CardCreateMethodModal} from '^clients/private/_modals/credit-cards';
import {LinkTo} from '^components/util/LinkTo';
import {PaymentMethodItem} from './PaymentMethodItem';
import {EmptyTableLayout} from '../EmptyTableLayout';
import {DashboardSectionLayout} from '../DashboardSectionLayout';

export const PaymentMethodsSection = memo(() => {
    const orgId = useRecoilValue(orgIdParamState);
    const router = useRouter();

    const {
        data: dashboardCreditCardsSectionResult,
        isLoading,
        refetch,
    } = useDashboardCreditCardsSectionResultDto(orgId);
    const {items = [], total} = dashboardCreditCardsSectionResult || {};

    const [isCardCreateMethodModalOpen, setIsCardCreateMethodModalOpen] = useState(false);
    const [isCardAutoCreateModalOpen, setIsCardAutoCreateModalOpen] = useState(false);

    if (items.length === 0) {
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
                        refetch();
                    }}
                />
            </>
        );
    }

    return (
        <DashboardSectionLayout
            title="결제수단"
            subTitle={`총 ${unitFormat(total?.totalItemCount || 0, '개')}`}
            isLoading={isLoading}
        >
            <div className="min-h-[250px] flex flex-col justify-between">
                <ul>
                    {items.map((item) => (
                        <PaymentMethodItem key={item.id} item={item} />
                    ))}
                </ul>

                <LinkTo
                    href={OrgCreditCardListPageRoute.path(orgId)}
                    text="전체보기"
                    className="w-full flex items-center justify-center font-semibold text-14 text-gray-400"
                />
            </div>
        </DashboardSectionLayout>
    );
});
