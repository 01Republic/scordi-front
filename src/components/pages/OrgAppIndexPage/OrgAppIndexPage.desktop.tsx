import React, {memo} from 'react';
import OrgMainLayout from '^layouts/org/mainLayout';
import {ContentLayout} from '^layouts/ContentLayout';
import {TabContentForSubscriptions} from '^components/pages/OrgAppIndexPage/TabContentForSubscriptions';
import {TabContentForIntegrations} from '^components/pages/OrgAppIndexPage/TabContentForIntegrations';
import {ConnectPrototypeModal} from './modals/ConnectPrototypeModal';
import {defineTabs, useTabs} from '^components/util/tabs';

const appsTab = defineTabs('AppsTab', [
    {label: 'Subscriptions', TabPane: TabContentForSubscriptions},
    {label: 'Integrations', TabPane: TabContentForIntegrations},
]);

export const OrgAppIndexPageDesktop = memo(() => {
    const {TabNav, CurrentTabPane} = useTabs(appsTab);

    return (
        <OrgMainLayout>
            <ContentLayout title="Apps">
                <TabNav />
                <CurrentTabPane />
            </ContentLayout>
            <ConnectPrototypeModal />
        </OrgMainLayout>
    );
});
