import React, {memo} from 'react';
import {WithChildren} from '^types/global.type';
import {useOrgIdParam} from '^atoms/common';
import {BsBuildingFill, BsCreditCard, BsPeopleFill} from 'react-icons/bs';
import {OrgSettingsInformationPageRoute} from '^pages/orgs/[id]/settings';
import {OrgSettingsPaymentPageRoute} from '^pages/orgs/[id]/settings/payments';
import {OrgSettingsMemberPageRoute} from '^pages/orgs/[id]/settings/members';
import {MainContainer, MainLayout} from '^clients/private/_layouts/MainLayout';
import {Breadcrumb, BreadcrumbPath} from '^clients/private/_layouts/_shared/Breadcrumb';
import {OrgSettingsContent} from './OrgSettingsContent';
import {OrgSettingsLeftListBox} from './OrgSettingsLeftListBox';
import {OrgSettingLeftListItem} from './OrgSettingsLeftListItem';

interface OrgSettingsLayoutProps extends WithChildren {
    breadcrumbPath: BreadcrumbPath;
}

export const OrgSettingsLayout = memo(function OrgSettingsLayout(props: OrgSettingsLayoutProps) {
    const {children} = props;
    const orgId = useOrgIdParam();

    return (
        <MainLayout>
            <MainContainer>
                <Breadcrumb paths={['설정', props.breadcrumbPath]} />
                <div className={'grid grid-cols-5 gap-4 mt-4'}>
                    {/* 메뉴 영역 */}
                    <div className={'col-span-1 flex flex-col gap-4'}>
                        <OrgSettingsLeftListBox title="일반">
                            <OrgSettingLeftListItem
                                Icon={BsBuildingFill}
                                name={'워크스페이스 정보'}
                                href={OrgSettingsInformationPageRoute.path(orgId)}
                            />
                            <OrgSettingLeftListItem
                                Icon={BsCreditCard}
                                name={'구독 및 결제'}
                                href={OrgSettingsPaymentPageRoute.path(orgId)}
                            />
                            <OrgSettingLeftListItem
                                Icon={BsPeopleFill}
                                name={'멤버 관리'}
                                href={OrgSettingsMemberPageRoute.path(orgId)}
                            />
                        </OrgSettingsLeftListBox>
                    </div>

                    {/* 내용 영역 */}
                    <div className={'col-span-4 px-6'}>
                        <OrgSettingsContent
                            title={
                                typeof props.breadcrumbPath === 'object'
                                    ? props.breadcrumbPath.text
                                    : props.breadcrumbPath
                            }
                        >
                            {children}
                        </OrgSettingsContent>
                    </div>
                </div>
            </MainContainer>
        </MainLayout>
    );
});

export * from './OrgSettingsListSection';
