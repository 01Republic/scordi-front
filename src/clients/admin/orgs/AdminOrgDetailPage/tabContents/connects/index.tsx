import {memo} from 'react';
import {useRecoilValue} from 'recoil';
import {adminOrgDetail} from '^admin/orgs/AdminOrgDetailPage';
import {ConnectedWorkspaceListTabContent} from './ConnectedWorkspaceListTabContent';
import {InvoiceAccountListTabContent} from './InvoiceAccountListTabContent';
import {ConnectWithCardTabContent} from './ConnectWithCardTabContent';
import {defineTabs, useTabs} from '^components/util/tabs';

const connectionTab = defineTabs('adminOrgDetailPage/connections', [
    {label: '구성원(워크스페이스)', TabPane: ConnectedWorkspaceListTabContent},
    {label: '결제메일', TabPane: InvoiceAccountListTabContent},
    {label: '카드', TabPane: ConnectWithCardTabContent},
]);

export const AdminOrgConnectionTabContent = memo(() => {
    const org = useRecoilValue(adminOrgDetail);
    const {currentTabIndex, setCurrentTabIndex, tabs, CurrentTabPane} = useTabs(connectionTab);

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
