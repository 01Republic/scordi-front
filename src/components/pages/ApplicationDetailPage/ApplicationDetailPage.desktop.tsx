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

    return (
        <OrgMainLayout>
            <ContentLayout>
                <Breadcrumb />
                <PrototypeHeader />
                <ContentTabNav
                    resetIndex={true}
                    tabs={['information', 'spend', 'invoices', 'histories', 'settings']}
                    recoilState={navTabIndex}
                />

                {tabIndex === 0 && <TabContentForInformation />}
                {tabIndex === 1 && <TabContentForSpend />}
                {tabIndex === 2 && <TabContentForInvoices />}
                {tabIndex === 3 && <TabContentForHistories />}
                {tabIndex === 4 && <TabContentForSettings />}
            </ContentLayout>
        </OrgMainLayout>
    );
});
