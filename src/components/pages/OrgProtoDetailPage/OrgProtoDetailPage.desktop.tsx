import {memo} from 'react';
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
import {TabContentForHistories} from './TabContents/TabContentForHistories';

export const navTabIndex = atom({
    key: 'Prototypes/NavTabIndex',
    default: 0,
});

export const OrgProtoDetailPageDesktop = memo(() => {
    useRouterIdParamState('id', orgIdParamState);
    useRouterIdParamState('protoId', prototypeIdParamsState);
    const tabIndex = useRecoilValue(navTabIndex);

    return (
        <OrgMainLayout>
            <ContentLayout>
                <Breadcrumb />
                <PrototypeHeader />
                <ContentTabNav
                    resetIndex={true}
                    tabs={['information', 'spend', 'invoices']}
                    recoilState={navTabIndex}
                />

                {tabIndex === 0 && <TabContentForInformation />}
                {tabIndex === 1 && <TabContentForSpend />}
                {tabIndex === 2 && <TabContentForInvoices />}
            </ContentLayout>
        </OrgMainLayout>
    );
});
