import {memo} from 'react';
import {useRecoilValue} from 'recoil';
import {adminOrgDetail} from '^admin/orgs/AdminOrgDetailPage';
import {defineTabs, useTabs} from '^components/util/tabs';
import {ScordiSubscriptionTabContent} from './ScordiSubscriptionTabContent';
import {ScordiPaymentTabContent} from './ScordiPaymentTabContent';

const tabAtoms = defineTabs('adminOrgDetailPage/payments', [
    {label: '구독', TabPane: ScordiSubscriptionTabContent},
    {label: '결제', TabPane: ScordiPaymentTabContent},
]);

export const PaymentListTabContent = memo(function PaymentListTabContent() {
    const org = useRecoilValue(adminOrgDetail);
    const {currentTabIndex, setCurrentTabIndex, tabs, CurrentTabPane} = useTabs(tabAtoms);

    if (!org) return <></>;

    return (
        <div>
            <div className="w-full mb-12">
                <div className="flex mb-6 gap-8">
                    {tabs.map((tab, i) => (
                        <h2
                            key={i}
                            className={`text-2xl cursor-pointer transition-all ${
                                i === currentTabIndex ? '' : 'text-gray-400 hover:text-gray-600'
                            }`}
                            onClick={() => setCurrentTabIndex(i)}
                        >
                            {tab.label}
                        </h2>
                    ))}
                </div>
            </div>

            <CurrentTabPane />
        </div>
    );
});
