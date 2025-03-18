import {Fragment, memo, useEffect} from 'react';
import OrgMainLayout from '^layouts/org/mainLayout';
import {ContentLayout, ContentTabNav} from '^layouts/ContentLayout';
import {orgIdParamState, productIdParamsState, useRouterIdParamState} from '^atoms/common';
import {PrototypeHeader, Breadcrumb} from './index';
import {atom, useRecoilValue} from 'recoil';
import {TabContentForSetting} from '^components/pages/OrgProtoDetailPage/TabContents/TabContentForSetting';
import {useCurrentUser} from '^models/User/hook';
import {SubscriptionDto} from 'src/models/Subscription/types';
import {defineTabs, useTabs} from '^components/util/tabs';
import {TabContentForInformation, TabContentForInvoices, TabContentForSpend} from '../OrgAppShowPage/TabContents';

const protoDetailPageTab = defineTabs('protoDetailPageTab', [
    {label: 'information', TabPane: TabContentForInformation},
    {label: 'spend', TabPane: TabContentForSpend},
    {label: 'invoices', TabPane: TabContentForInvoices},
]);

export const subscriptionsForThisPrototypeAtom = atom<SubscriptionDto[]>({
    key: 'subscriptionsForThisPrototypeAtom',
    default: [],
});

export const OrgProtoDetailPageDesktop = memo(() => {
    useRouterIdParamState('id', orgIdParamState);
    useRouterIdParamState('protoId', productIdParamsState);
    const {currentUser} = useCurrentUser();
    const {tabs, TabNav, CurrentTabPane, addTabs} = useTabs(protoDetailPageTab);

    useEffect(() => {
        if (currentUser && currentUser.isAdmin) {
            addTabs([{label: 'setting', TabPane: TabContentForSetting}]);
        }
    }, [currentUser]);

    return (
        <OrgMainLayout>
            <ContentLayout>
                <Breadcrumb />
                <PrototypeHeader />
                <TabNav tabs={tabs.map((tab) => tab.label)} />
                <CurrentTabPane />
            </ContentLayout>
        </OrgMainLayout>
    );
});
