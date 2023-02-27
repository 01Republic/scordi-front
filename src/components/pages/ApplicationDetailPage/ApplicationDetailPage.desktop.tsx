import {memo} from 'react';
import OrgMainLayout from '^layouts/org/mainLayout';
import {ContentLayout, ContentTabNav} from '^layouts/ContentLayout';
import {applicationIdParamState, orgIdParamState, prototypeIdParamsState, useRouterIdParamState} from '^atoms/common';
import {TabContentForInformation, TabContentForInvoices, TabContentForSpend} from './index';
import {atom, useRecoilValue} from 'recoil';
import {Breadcrumb, PrototypeHeader} from '../OrgProtoDetailPage';

export const navTabIndex = atom({
    key: 'Prototypes/NavTabIndex',
    default: 0,
});

export const ApplicationDetailPageDesktop = memo(() => {
    useRouterIdParamState('id', orgIdParamState);
    useRouterIdParamState('protoId', prototypeIdParamsState);
    useRouterIdParamState('applications', applicationIdParamState);
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
