import React from 'react';
import {MainLayout} from '^clients/private/_layouts/MainLayout';
import {QuickButtonSection} from './QuickButtonSection';
import {MonthlyTotalExpenseSection} from './MonthlyTotalExpenseSection';
import {PaymentMethodsSection} from './PaymentMethodsSection';
import {InvoiceAccountsSection} from './InvoiceAccountsSection';
import {YearlySection} from './YearlySection';

export const OrgDashboardPage = () => {
    return (
        <MainLayout>
            <section className="container px-4 flex flex-col gap-10">
                <div className="flex items-center justify-between mt-10">
                    <h5 className="font-bold text-24">대시보드</h5>
                    <QuickButtonSection />
                </div>
                <MonthlyTotalExpenseSection />
                <div className="flex gap-5">
                    <PaymentMethodsSection />
                    <InvoiceAccountsSection />
                </div>
                <YearlySection />
            </section>
        </MainLayout>
    );
};
