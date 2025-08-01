import {MainContainer, MainLayout} from '^clients/private/_layouts/MainLayout';
import {DashboardTitle} from './DashboardTitle';
import {InvoiceAccountsSection} from './InvoiceAccountsSection';
import {MonthlyTotalExpenseSection} from './MonthlyTotalExpenseSection';
import {PaymentMethodsSection} from './PaymentMethodsSection';
import {QuickButtonGroup} from './QuickButtonGroup';
import {YearlySection} from './YearlySection';

export const OrgDashboardPage = () => {
    return (
        <MainLayout>
            <MainContainer>
                <div className="flex flex-col gap-6 lg:gap-10 -m-4 sm:m-0">
                    <div className="flex flex-col gap-2 lg:flex-row md:items-start lg:items-center lg:justify-between lg:mt-10 pl-4 sm:pl-0">
                        <DashboardTitle />
                        <QuickButtonGroup />
                    </div>

                    {/* 이달의 지출 총액 */}
                    <MonthlyTotalExpenseSection />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        {/* 결제수단 */}
                        <PaymentMethodsSection />

                        {/* 청구서 메일 */}
                        <InvoiceAccountsSection />
                    </div>

                    {/* 올 해의 구독 현황 */}
                    <YearlySection />
                </div>
            </MainContainer>
        </MainLayout>
    );
};
