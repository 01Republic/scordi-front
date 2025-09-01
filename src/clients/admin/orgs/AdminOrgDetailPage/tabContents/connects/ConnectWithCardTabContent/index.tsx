import {memo} from 'react';
import {useRecoilValue} from 'recoil';
import {useUnmount} from '^hooks/useUnmount';
import {adminOrgDetail} from '^admin/orgs/AdminOrgDetailPage';
import {defineTabs, useTabs} from '^components/util/tabs';
import {CodefAccountListContent} from './CodefAccountListContent';
import {CodefCardListContent} from './CodefCardListContent';
import {CodefBillingHistoryListContent} from './CodefBillingHistoryListContent';

const cardConnectedTab = defineTabs('cardConnectedTab', [
    {label: '카드사 계정', TabPane: CodefAccountListContent},
    {label: '카드', TabPane: CodefCardListContent},
    {label: '카드내역', TabPane: CodefBillingHistoryListContent},
]);

export const ConnectWithCardTabContent = memo(function ConnectWithCardTabContent() {
    const org = useRecoilValue(adminOrgDetail);
    const {tabs, currentTabIndex, setCurrentTabIndex, CurrentTabPane} = useTabs(cardConnectedTab);

    useUnmount(() => setCurrentTabIndex(0), []);

    if (!org) return <></>;

    return (
        <div className="grid grid-cols-7 gap-6">
            <div>
                <ul className="p-0 menu bg-base-100 shadow">
                    {tabs.map((tab, i) => (
                        <li key={i} className={currentTabIndex === i ? 'bordered' : ''}>
                            <a onClick={() => setCurrentTabIndex(i)}>{tab.label}</a>
                        </li>
                    ))}
                </ul>
            </div>

            <div className="col-span-6">
                <CurrentTabPane moveTab={(tabIndex: number) => setCurrentTabIndex(tabIndex)} />
            </div>
        </div>
    );
});
