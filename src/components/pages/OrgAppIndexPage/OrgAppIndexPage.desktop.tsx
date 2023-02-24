import React, {memo} from 'react';
import OrgMainLayout from '^layouts/org/mainLayout';
import {ContentLayout, ContentTabNav} from '^layouts/ContentLayout';
import {atom, useRecoilValue} from 'recoil';
import {TabContentForSubscriptions} from '^components/pages/OrgAppIndexPage/TabContentForSubscriptions';
import {TabContentForIntegrations} from '^components/pages/OrgAppIndexPage/TabContentForIntegrations';
import {ConnectPrototypeModal} from './modals/ConnectPrototypeModal';

export const navTabIndex = atom({
    key: 'Apps/NavTabIndex',
    default: 0,
});

export const OrgAppIndexPageDesktop = memo(() => {
    const tabIndex = useRecoilValue(navTabIndex);

    return (
        <OrgMainLayout>
            <ContentLayout title="Apps">
                <ContentTabNav resetIndex={true} recoilState={navTabIndex} tabs={['Subscriptions', 'Integrations']} />

                {tabIndex === 0 && <TabContentForSubscriptions />}
                {tabIndex === 1 && <TabContentForIntegrations />}
            </ContentLayout>
            <ConnectPrototypeModal />
        </OrgMainLayout>
    );
});
