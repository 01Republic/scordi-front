import React, {memo} from 'react';
import OrgMainLayout from '^layouts/org/mainLayout';
import {ContentLayout} from '^layouts/ContentLayout';
import {navTabIndex, NavTabs} from './NavTabs';
import {useRecoilValue} from 'recoil';
import {TabContentForSubscriptions} from '^components/pages/OrgAppIndexPage/TabContentForSubscriptions';
import {TabContentForIntegrations} from '^components/pages/OrgAppIndexPage/TabContentForIntegrations';

export const OrgAppIndexPageDesktop = memo(() => {
    const tabIndex = useRecoilValue(navTabIndex);

    return (
        <OrgMainLayout>
            <ContentLayout title="Apps">
                <NavTabs />

                {tabIndex === 0 && <TabContentForSubscriptions />}
                {tabIndex === 1 && <TabContentForIntegrations />}
            </ContentLayout>
        </OrgMainLayout>
    );
});
