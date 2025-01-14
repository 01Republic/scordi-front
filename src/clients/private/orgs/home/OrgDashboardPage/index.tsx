import React from 'react';
import {MainContainer, MainLayout} from '^clients/private/_layouts/MainLayout';
import {QuickButtonSection} from './QuickButtonSection';
import {MonthlyTotalExpenseSection} from './MonthlyTotalExpenseSection';
import {PaymentMethodsSection} from './PaymentMethodsSection';
import {InvoiceAccountsSection} from './InvoiceAccountsSection';
import {YearlySection} from './YearlySection';

export const OrgDashboardPage = () => {
    return (
        <MainLayout>
            <MainContainer>
                <div className="flex flex-col gap-10">
                    <div className="flex items-center justify-between mt-10">
                        <h5 className="font-bold text-24">대시보드</h5>
                        <QuickButtonSection />
                    </div>

                    {/* 이달의 지출 총액 */}
                    <MonthlyTotalExpenseSection />
                    <div className="flex gap-5">
                        <PaymentMethodsSection />
                        <InvoiceAccountsSection />
                    </div>
                    <YearlySection />
                </div>
            </MainContainer>
        </MainLayout>
    );
};
