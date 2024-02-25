import {memo} from 'react';
import {atom, useRecoilState, useRecoilValue} from 'recoil';
import {adminOrgDetail} from '^admin/orgs/AdminOrgDetailPage';
import {ConnectedWorkspaceListTabContent} from './ConnectedWorkspaceListTabContent';
import {InvoiceAccountListTabContent} from './InvoiceAccountListTabContent';

export const connectionTabIndexAtom = atom({
    key: 'adminOrgDetailPage/connections/ConnectionTabIndex',
    default: 0,
});

export const AdminOrgConnectionTabContent = memo(() => {
    const org = useRecoilValue(adminOrgDetail);
    const [connectionTabIndex, setConnectionTabIndex] = useRecoilState(connectionTabIndexAtom);

    if (!org) return <></>;

    const tabs = [
        {label: '구성원(워크스페이스)', Component: ConnectedWorkspaceListTabContent},
        {label: '결제메일', Component: InvoiceAccountListTabContent},
        {label: '카드', Component: () => <></>},
    ];

    const TabContentComponent = tabs[connectionTabIndex]?.Component || tabs[0].Component;

    return (
        <div>
            <div className="w-full mb-12">
                <div className="flex mb-6 gap-8">
                    {tabs.map((tab, i) => (
                        <h2
                            key={i}
                            className={`text-2xl cursor-pointer transition-all ${
                                i === connectionTabIndex ? '' : 'text-gray-400 hover:text-gray-600'
                            }`}
                            onClick={() => setConnectionTabIndex(i)}
                        >
                            {tab.label}
                        </h2>
                    ))}
                </div>
            </div>

            <TabContentComponent />
        </div>
    );
});
