import {MonthlyTotalExpense} from '^clients/private/orgs/home/OrgDashboardPage/MonthlyTotalExpense';
import {QuickButton} from '^clients/private/orgs/home/OrgDashboardPage/QuickButton';
import {GoCreditCard} from 'react-icons/go';
import {HiOutlineSquaresPlus} from 'react-icons/hi2';
import {OrgSubscriptionSelectPageRoute} from '^pages/orgs/[id]/subscriptions/select';
import {useRecoilValue} from 'recoil';
import {currentOrgAtom} from '^models/Organization/atom';
import {MainLayout} from '^clients/private/_layouts/MainLayout';

export const OrgDashboardPage = () => {
    const currentOrg = useRecoilValue(currentOrgAtom);

    return (
        <MainLayout>
            <section className="container px-4 flex flex-col gap-10">
                <div className="flex items-center justify-between mt-10">
                    <h5 className="font-bold text-24">대시보드</h5>
                    <QuickButton
                        text="구독 추가"
                        Icon={() => <HiOutlineSquaresPlus />}
                        url={currentOrg ? OrgSubscriptionSelectPageRoute.path(currentOrg.id) : '#'}
                    />
                </div>
                <MonthlyTotalExpense />
            </section>
        </MainLayout>
    );
};
