import React, {memo} from 'react';
import {WithChildren} from '^types/global.type';
import {useOrgIdParam} from '^atoms/common';
import {OrgSettingsInformationPageRoute} from '^pages/orgs/[id]/settings';
import {OrgSettingsPaymentPageRoute} from '^pages/orgs/[id]/settings/payments';
import {OrgSettingsMemberPageRoute} from '^pages/orgs/[id]/settings/members';
import {OrgSettingsIntegrationsPageRoute} from '^pages/orgs/[id]/settings/integrations';
import {MainContainer, MainLayout} from '^clients/private/_layouts/MainLayout';
import {Breadcrumb, BreadcrumbPath} from '^clients/private/_layouts/_shared/Breadcrumb';
import {OrgSettingsContent} from './OrgSettingsContent';
import {OrgSettingsLeftListBox} from './OrgSettingsLeftListBox';
import {OrgSettingLeftListItem} from './OrgSettingsLeftListItem';
import {Building, CreditCard, Users, WalletMinimal, Grid2x2Plus} from 'lucide-react';

interface OrgSettingsLayoutProps extends WithChildren {
    breadcrumbPath: BreadcrumbPath;
    ignoreCardWrap?: boolean;
}

export const OrgSettingsLayout = memo(function OrgSettingsLayout(props: OrgSettingsLayoutProps) {
    const {children, ignoreCardWrap = false} = props;
    const orgId = useOrgIdParam();

    return (
        <MainLayout>
            <MainContainer>
                <Breadcrumb paths={['설정', props.breadcrumbPath]} />
                <div className={'grid grid-cols-4 gap-4 mt-4'}>
                    <div className={'grid grid-cols-5 gap-4 mt-4'}>
                        {/* 메뉴 영역 */}
                        <div className={'col-span-1 flex flex-col gap-4'}>
                            <OrgSettingsLeftListBox title="일반">
                                <OrgSettingLeftListItem
                                    Icon={Building}
                                    name={'워크스페이스 정보'}
                                    href={OrgSettingsInformationPageRoute.path(orgId)}
                                />
                                <OrgSettingLeftListItem
                                    Icon={CreditCard}
                                    name={'구독 및 결제'}
                                    href={OrgSettingsPaymentPageRoute.path(orgId)}
                                />
                                <OrgSettingLeftListItem
                                    Icon={Users}
                                    name={'멤버 관리'}
                                    href={OrgSettingsMemberPageRoute.path(orgId)}
                                />
                            </OrgSettingsLeftListBox>
                        </div>
                    </div>

                    <div className={'col-span-1'}>
                        <div className={'card border rounded-lg bg-white p-6 mb-6'}>
                            <div className={'pt-2 px-4 text-12 text-gray-400 mb-2'}>일반</div>
                            <div className={'text-sm mb-4'}>
                                <OrgSettingLeftListItem
                                    Icon={Building}
                                    name={'워크스페이스 정보'}
                                    href={OrgSettingsInformationPageRoute.path(orgId)}
                                />
                                <OrgSettingLeftListItem
                                    Icon={CreditCard}
                                    name={'구독 및 결제'}
                                    href={OrgSettingsPaymentPageRoute.path(orgId)}
                                />
                            </div>

                            <div className={'pt-2 px-4 text-12 text-gray-400 mb-2'}>관리 및 연동</div>
                            <div className={'text-sm'}>
                                <OrgSettingLeftListItem
                                    Icon={Users}
                                    name={'멤버 관리'}
                                    href={OrgSettingsMemberPageRoute.path(orgId)}
                                />

                                <OrgSettingLeftListItem Icon={WalletMinimal} name={'자산 연결'} href="#" />

                                <OrgSettingLeftListItem
                                    Icon={Grid2x2Plus}
                                    name={'서비스 연동'}
                                    href={OrgSettingsIntegrationsPageRoute.path(orgId)}
                                />
                            </div>
                        </div>
                    </div>

                    {ignoreCardWrap ? (
                        <div className="col-span-3">{children}</div>
                    ) : (
                        <div className="col-span-3 card border rounded-lg bg-white p-6">
                            <div className={'mb-8'}>{children}</div>
                        </div>
                    )}
                </div>
            </MainContainer>
        </MainLayout>
    );
});

export * from './OrgSettingsListSection';
