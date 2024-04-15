import {memo, useEffect} from 'react';
import {atom} from 'recoil';
import {subscriptionIdParamState, orgIdParamState, useRouterIdParamState} from '^atoms/common';
import OrgMainLayout from '^layouts/org/mainLayout';
import {ContentLayout} from '^layouts/ContentLayout';
import {useCurrentUser} from '^models/User/hook';
import {ApplicationHeader} from './ApplicationHeader';
import {
    TabContentForInformation,
    TabContentForSpend,
    TabContentForInvoices,
    TabContentForHistories,
    TabContentForSettings,
} from './TabContents';
import {CurrentConnectStatus} from './CurrentConnectStatus';
import {Breadcrumb} from './Breadcrumb';
import {ConnectStatusPooling} from './ConnectStatusPooling';
import {defineTabs, useTabs} from '^components/util/tabs';

export const navTabIndex = atom({
    key: 'OrgAppShowPageDesktop/NavTabIndex',
    default: 0,
});
const appShowPageTab = defineTabs('appShowPageTab', [
    {label: 'information', TabPane: TabContentForInformation},
    {label: 'spend', TabPane: TabContentForSpend},
    {label: 'invoices', TabPane: TabContentForInvoices},
    {label: 'histories', TabPane: TabContentForHistories},
]);

export const OrgAppShowPageDesktop = memo(() => {
    useRouterIdParamState('id', orgIdParamState);
    useRouterIdParamState('appId', subscriptionIdParamState);
    const {currentUser} = useCurrentUser();
    const {tabs, TabNav, CurrentTabPane, addTabs} = useTabs(appShowPageTab);

    useEffect(() => {
        if (currentUser && currentUser.isAdmin) {
            addTabs([{label: 'settings (admin only)', TabPane: TabContentForSettings}]);
        }
    }, [currentUser]);

    return (
        <OrgMainLayout>
            <ContentLayout>
                <ConnectStatusPooling />
                <div className="flex justify-between items-baseline">
                    <Breadcrumb />
                </div>
                <ApplicationHeader>
                    <CurrentConnectStatus />
                </ApplicationHeader>

                <TabNav tabs={tabs.map((tab) => tab.label)} />

                <CurrentTabPane />
            </ContentLayout>
        </OrgMainLayout>
    );
});
