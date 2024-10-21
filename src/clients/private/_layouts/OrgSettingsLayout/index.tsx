import React, {memo} from 'react';
import {useRecoilValue} from 'recoil';
import {WithChildren} from '^types/global.type';
import {orgIdParamState} from '^atoms/common';
import {BsBuildingFill, BsCreditCard, BsPeopleFill} from 'react-icons/bs';
import {OrgSettingsInformationPageRoute} from '^pages/orgs/[id]/settings';
import {OrgSettingsPaymentPageRoute} from '^pages/orgs/[id]/settings/payments';
import {OrgSettingsMemberPageRoute} from '^pages/orgs/[id]/settings/members';
import {MainContainer, MainLayout} from '^clients/private/_layouts/MainLayout';
import {Breadcrumb, BreadcrumbPath} from '^clients/private/_layouts/_shared/Breadcrumb';
import {useCurrentOrg} from '^models/Organization/hook';
import {OrgSettingLeftListItem} from './OrgSettingsLeftListItem';

type OrgSettingsLayoutProps = {
    breadcrumbPath: BreadcrumbPath;
} & WithChildren;

export const OrgSettingsLayout = memo(function OrgSettingsLayout(props: OrgSettingsLayoutProps) {
    const {children} = props;
    const orgId = useRecoilValue(orgIdParamState);
    const {currentOrg} = useCurrentOrg(orgId);

    return (
        <MainLayout>
            <MainContainer>
                <Breadcrumb paths={['설정', props.breadcrumbPath]} />
                <div className={'grid grid-cols-4 gap-4 mt-4'}>
                    <div className={'col-span-1'}>
                        <div className={'card border rounded-lg bg-white p-6'}>
                            <div className={'text-lg mt-4 font-bold mb-6'}>{currentOrg?.name}</div>
                            <div className={'text-sm'}>
                                <OrgSettingLeftListItem
                                    Icon={BsBuildingFill}
                                    name={'워크스페이스 정보'}
                                    href={OrgSettingsInformationPageRoute.path(orgId)}
                                />
                                <OrgSettingLeftListItem
                                    Icon={BsCreditCard}
                                    name={'결제 관리'}
                                    href={OrgSettingsPaymentPageRoute.path(orgId)}
                                />
                                <OrgSettingLeftListItem
                                    Icon={BsPeopleFill}
                                    name={'멤버 관리'}
                                    href={OrgSettingsMemberPageRoute.path(orgId)}
                                />
                            </div>
                        </div>
                    </div>
                    <div className={'col-span-3 card border rounded-lg bg-white p-6'}>
                        <div className={'mb-8'}>{children}</div>
                    </div>
                </div>
            </MainContainer>
        </MainLayout>
    );
});

export * from './OrgSettingsListSection';
