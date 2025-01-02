import {DashboardLayout} from '^clients/private/orgs/home/OrgDashboardPage/DashboardLayout';
import {GoCreditCard, GoMail} from 'react-icons/go';
import {Avatar} from '^components/Avatar';
import React from 'react';
import {useRouter} from 'next/router';
import {useRecoilValue} from 'recoil';
import {orgIdParamState} from '^atoms/common';
import {currencyFormat} from '^utils/number';
import {usePaymentMethodListInDashboard} from '^models/_dashboard/hook';
import {OrganizationDto} from '^models/Organization/type';
import {DashboardItemListLayout} from '^clients/private/orgs/home/OrgDashboardPage/DashboardItemListLayout';
import {EmptyTableLayout} from '^clients/private/orgs/home/OrgDashboardPage/EmptyTableLayout';

interface PaymentMethodsSectionSectionProps {
    currentOrg: OrganizationDto | null;
}

export const PaymentMethodsSection = (props: PaymentMethodsSectionSectionProps) => {
    const orgId = useRecoilValue(orgIdParamState);
    const router = useRouter();
    const {data: paymentMethods, isLoading} = usePaymentMethodListInDashboard(orgId);

    const showCardNumber = (first: string, second: string) => {
        const secondNumber = second.slice(0, 2);
        const privateMask = '****';
        return `${first}-${secondNumber}**-${privateMask}-${privateMask}`;
    };

    if (!paymentMethods) return <EmptyTableLayout title="결제수단" Icon={() => <GoCreditCard />} />;
    return (
        <DashboardLayout
            title="결제수단"
            subTitle={
                paymentMethods.total.payAmountSum
                    ? `-${currencyFormat(paymentMethods.total.payAmountSum)}`
                    : currencyFormat(paymentMethods.total.payAmountSum)
            }
        >
            <section className="w-full flex flex-col gap-10">
                <ul>
                    {paymentMethods?.items.map((item) => (
                        <DashboardItemListLayout
                            key={item.id}
                            url={`${orgId}/creditCards/${item.creditCard?.id}`}
                            src={item.creditCard?.company?.logo || ''}
                            avatarClassName="w-7 h-7"
                            Icon={() => <GoCreditCard />}
                            title={`[${item.creditCard?.profileName}] ${showCardNumber(
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
                    onClick={() => router.push(`${orgId}/creditCards`)}
                    className="w-full flex items-center justify-center font-semibold text-14 text-gray-400"
                >
                    전체보기
                </button>
            </section>
        </DashboardLayout>
    );
};
