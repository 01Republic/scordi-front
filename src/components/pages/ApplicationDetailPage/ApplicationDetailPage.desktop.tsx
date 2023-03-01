import {memo} from 'react';
import OrgMainLayout from '^layouts/org/mainLayout';
import {ContentLayout, ContentTabNav} from '^layouts/ContentLayout';
import {applicationIdParamState, orgIdParamState, useRouterIdParamState} from '^atoms/common';
import {atom, useRecoilValue} from 'recoil';
import {Breadcrumb, PrototypeHeader} from '../OrgProtoDetailPage';
import {
    TabContentForInformation,
    TabContentForSpend,
    TabContentForInvoices,
    TabContentForHistories,
    TabContentForSettings,
} from './TabContents';

export const navTabIndex = atom({
    key: 'ApplicationDetailPageDesktop/NavTabIndex',
    default: 0,
});

export const ApplicationDetailPageDesktop = memo(() => {
    useRouterIdParamState('id', orgIdParamState);
    useRouterIdParamState('appId', applicationIdParamState);
    const tabIndex = useRecoilValue(navTabIndex);

    const tabs = [
        // {label: 'information', Component: TabContentForInformation},
        {label: 'spend', Component: TabContentForSpend},
        {label: 'invoices', Component: TabContentForInvoices},
        {label: 'histories', Component: TabContentForHistories},
        {label: 'settings', Component: TabContentForSettings},
    ];

    const TabContentComponent = tabs[tabIndex].Component;

    return (
        <OrgMainLayout>
            <ContentLayout>
                <Breadcrumb />
                <PrototypeHeader />
                <ContentTabNav resetIndex={true} tabs={tabs.map((tab) => tab.label)} recoilState={navTabIndex} />

                <TabContentComponent />
            </ContentLayout>
        </OrgMainLayout>
    );
});
