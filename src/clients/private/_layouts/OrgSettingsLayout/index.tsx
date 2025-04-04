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
    clearBody?: boolean;

    /**
     * 만약 breadcrumbPath 로 주어진 현재 페이지가
     * 레이아웃 왼쪽 사이드 메뉴와 다른 경우,
     * 사이드 메뉴 중 어느것을 활성 상태로 보여줄 지,
     * 지정할 수 있습니다.
     *
     * 메뉴 이름 텍스트를 입력하세요.
     */
    activeMenuName?: string;
}

export const OrgSettingsLayout = memo(function OrgSettingsLayout(props: OrgSettingsLayoutProps) {
    const {children, breadcrumbPath, ignoreCardWrap = false, clearBody = false, activeMenuName} = props;
    const orgId = useOrgIdParam();

    return (
        <MainLayout>
            <MainContainer>
                <Breadcrumb paths={['설정', breadcrumbPath]} />

                <div className={'grid grid-cols-5 gap-4 mt-4'}>
                    {/* 메뉴 영역 */}
                    <div className={'col-span-1'}>
                        <div className={''}>
                            <div className={'pt-2 px-4 text-12 text-gray-400 mb-2'}>일반</div>
                            <div className={'text-sm mb-4'}>
                                <OrgSettingLeftListItem
                                    Icon={Building}
                                    name={'워크스페이스 정보'}
                                    href={OrgSettingsInformationPageRoute.path(orgId)}
                                    forceActive={activeMenuName}
                                />
                                <OrgSettingLeftListItem
                                    Icon={CreditCard}
                                    name={'구독 및 결제'}
                                    href={OrgSettingsPaymentPageRoute.path(orgId)}
                                    forceActive={activeMenuName}
                                />
                            </div>

                            <div className={'pt-2 px-4 text-12 text-gray-400 mb-2'}>관리 및 연동</div>
                            <div className={'text-sm'}>
                                <OrgSettingLeftListItem
                                    Icon={Users}
                                    name={'멤버 관리'}
                                    href={OrgSettingsMemberPageRoute.path(orgId)}
                                    forceActive={activeMenuName}
                                />

                                {/*<OrgSettingLeftListItem Icon={WalletMinimal} name={'자산 연결'} href="#" />*/}

                                <OrgSettingLeftListItem
                                    Icon={Grid2x2Plus}
                                    name={'서비스 연동'}
                                    href={OrgSettingsIntegrationsPageRoute.path(orgId)}
                                    forceActive={activeMenuName}
                                />
                            </div>
                        </div>
                    </div>

                    {clearBody ? (
                        <div className="col-span-4 px-6">{children}</div>
                    ) : ignoreCardWrap ? (
                        <div className="col-span-4 px-6">
                            <div className="text-xl font-bold mb-4">
                                {typeof breadcrumbPath === 'string' ? breadcrumbPath : breadcrumbPath.text}
                            </div>
                            <div className="flex flex-col gap-6 mb-8">{children}</div>
                        </div>
                    ) : (
                        <div className="col-span-4 p-6 card border rounded-lg bg-white">
                            <div className={'mb-8'}>{children}</div>
                        </div>
                    )}
                </div>
            </MainContainer>
        </MainLayout>
    );
});

export * from './OrgSettingsListSection';
