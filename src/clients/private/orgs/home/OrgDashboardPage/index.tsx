import React, {useEffect} from 'react';
import {useRecoilValue} from 'recoil';
import {HiOutlineSquaresPlus} from 'react-icons/hi2';
import {GoCreditCard, GoMail} from 'react-icons/go';
import {AiOutlineUserAdd} from 'react-icons/ai';
import {currentOrgAtom} from '^models/Organization/atom';
import {OrgSubscriptionSelectPageRoute} from '^pages/orgs/[id]/subscriptions/select';
import {MainLayout} from '^clients/private/_layouts/MainLayout';
import {QuickButton} from '^clients/private/orgs/home/OrgDashboardPage/QuickButton';
import {MonthlyTotalExpenseSection} from 'src/clients/private/orgs/home/OrgDashboardPage/MonthlyTotalExpenseSection';
import {useTeamsForListPage} from '^models/Team/hook';
import {orgIdParamState} from '^atoms/common';
import {SubscriptionListSection} from '^clients/private/orgs/home/OrgDashboardPage/SubscriptionListSection';
import {YearlySubscriptionsLogSection} from '^clients/private/orgs/home/OrgDashboardPage/YearlySubscriptionsLogSection';
import {PaymentMethodsSection} from '^clients/private/orgs/home/OrgDashboardPage/PaymentMethodsSection';
import {InvoiceAccountsSection} from '^clients/private/orgs/home/OrgDashboardPage/InvoiceAccountsSection';

export const OrgDashboardPage = () => {
    const currentOrg = useRecoilValue(currentOrgAtom);

    return (
        <MainLayout>
            <section className="container px-4 flex flex-col gap-10">
                <div className="flex items-center justify-between mt-10">
                    <h5 className="font-bold text-24">대시보드</h5>
                    <div className="flex gap-3">
                        <QuickButton
                            text="구독 추가"
                            Icon={() => <HiOutlineSquaresPlus />}
                            url={currentOrg ? OrgSubscriptionSelectPageRoute.path(currentOrg.id) : '#'}
                        />
                        <QuickButton text="결제수단 추가" Icon={() => <GoCreditCard />} />
                        <QuickButton text="청구서 메일 추가" Icon={() => <GoMail />} />
                        <QuickButton text="구성원 추가" Icon={() => <AiOutlineUserAdd />} />
                    </div>
                </div>
                <MonthlyTotalExpenseSection currentOrg={currentOrg} />
                <div className="flex gap-5">
                    <PaymentMethodsSection currentOrg={currentOrg} />
                    <InvoiceAccountsSection currentOrg={currentOrg} />
                </div>
                <div className="flex gap-5">
                    <YearlySubscriptionsLogSection />
                    <SubscriptionListSection />
                </div>
            </section>
        </MainLayout>
    );
};
