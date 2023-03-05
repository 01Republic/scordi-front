import {Fragment, memo} from 'react';
import OrgMainLayout from '^layouts/org/mainLayout';
import {ContentLayout, ContentTabNav} from '^layouts/ContentLayout';
import {orgIdParamState, prototypeIdParamsState, useRouterIdParamState} from '^atoms/common';
import {
    PrototypeHeader,
    Breadcrumb,
    TabContentForInformation,
    TabContentForInvoices,
    TabContentForSpend,
} from './index';
import {atom, useRecoilValue} from 'recoil';
import {TabContentForSetting} from '^components/pages/OrgProtoDetailPage/TabContents/TabContentForSetting';
import {useCurrentUser} from '^hooks/useCurrentUser';
import {ApplicationDto} from '^types/application.type';

export const navTabIndex = atom({
    key: 'Prototypes/NavTabIndex',
    default: 0,
});

export const subscriptionsForThisPrototypeAtom = atom<ApplicationDto[]>({
    key: 'subscriptionsForThisPrototypeAtom',
    default: [],
});

export const OrgProtoDetailPageDesktop = memo(() => {
    useRouterIdParamState('id', orgIdParamState);
    useRouterIdParamState('protoId', prototypeIdParamsState);
    const {currentUser} = useCurrentUser();
    const tabIndex = useRecoilValue(navTabIndex);

    const tabs = [
        {label: 'information', Component: TabContentForInformation},
        {label: 'spend', Component: TabContentForSpend},
        {label: 'invoices', Component: TabContentForInvoices},
    ];

    if (currentUser && currentUser.isAdmin) {
        tabs.push({label: 'setting', Component: TabContentForSetting});
    }

    const TabContentComponent = tabs[tabIndex]?.Component || Fragment;

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
