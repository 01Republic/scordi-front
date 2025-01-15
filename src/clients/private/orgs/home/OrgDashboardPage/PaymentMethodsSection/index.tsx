import React, {memo, useState} from 'react';
import {useRouter} from 'next/router';
import {GoCreditCard} from 'react-icons/go';
import {useRecoilValue} from 'recoil';
import {orgIdParamState} from '^atoms/common';
import {currencyFormat} from '^utils/number';
import {useDashboardCreditCardsSectionResultDto} from '^models/_dashboard/hook';
import {DashboardSectionLayout} from '^clients/private/orgs/home/OrgDashboardPage/DashboardSectionLayout';
import {DashboardItemListLayout} from '^clients/private/orgs/home/OrgDashboardPage/DashboardItemListLayout';
import {EmptyTableLayout} from '^clients/private/orgs/home/OrgDashboardPage/EmptyTableLayout';
import {CardAutoCreateModal, CardCreateMethod, CardCreateMethodModal} from '^clients/private/_modals/credit-cards';
import {OrgCreditCardNewPageRoute} from '^pages/orgs/[id]/creditCards/new';
import {OrgCreditCardShowPageRoute} from '^pages/orgs/[id]/creditCards/[creditCardId]';
import {OrgCreditCardListPageRoute} from '^pages/orgs/[id]/creditCards';

export const PaymentMethodsSection = memo(() => {
    const orgId = useRecoilValue(orgIdParamState);
    const router = useRouter();
    const {data: dashboardCreditCardsSectionResult, isLoading} = useDashboardCreditCardsSectionResultDto(orgId);
    const [isCardCreateMethodModalOpen, setIsCardCreateMethodModalOpen] = useState(false);
    const [isCardAutoCreateModalOpen, setIsCardAutoCreateModalOpen] = useState(false);

    const showCardNumber = (first: string, second: string) => {
        const secondNumber = second.slice(0, 2);
        const privateMask = '****';
        return `${first}-${secondNumber}**-${privateMask}-${privateMask}`;
    };

    if (dashboardCreditCardsSectionResult?.items.length === 0)
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
    return (
        <DashboardSectionLayout
            title="결제수단"
            subTitle={currencyFormat(
                (dashboardCreditCardsSectionResult && dashboardCreditCardsSectionResult.total.payAmountSum) || 0,
            )}
            isLoading={isLoading}
        >
            <section className="w-full flex flex-col gap-10">
                <ul>
                    {dashboardCreditCardsSectionResult?.items.map((item) => (
                        <DashboardItemListLayout
                            key={item.id}
                            url={OrgCreditCardShowPageRoute.path(orgId, item.creditCard?.id || 0)}
                            src={item.creditCard?.company?.logo || ''}
                            avatarClassName="w-7 h-7"
                            Icon={() => <GoCreditCard />}
                            title={`[${item.creditCard?.profileName || '알수없음'}] ${showCardNumber(
                                item.creditCard?.secretInfo?.number1 || '****',
                                item.creditCard?.secretInfo.number2 || '****',
                            )}`}
                            subTitle={`끝자리: ${item.creditCard?.secretInfo.number4}`}
                            message={
                                item.payAmountSum
                                    ? `-${currencyFormat(item.payAmountSum)}`
                                    : currencyFormat(item.payAmountSum)
                            }
                        />
                    ))}
                </ul>
                <button
                    onClick={() => router.push(OrgCreditCardListPageRoute.path(orgId))}
                    className="w-full flex items-center justify-center font-semibold text-14 text-gray-400"
                >
                    전체보기
                </button>
            </section>
        </DashboardSectionLayout>
    );
});
