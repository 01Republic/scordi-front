import React, {memo} from 'react';
import {WithChildren} from '^types/global.type';
import {useOrgIdParam} from '^atoms/common';
import {OrgSettingsInformationPageRoute} from '^pages/orgs/[id]/settings';
import {OrgSettingsPaymentPageRoute} from '^pages/orgs/[id]/settings/payments';
import {OrgSettingsMemberPageRoute} from '^pages/orgs/[id]/settings/members';
import {OrgSettingsIntegrationsPageRoute} from '^pages/orgs/[id]/settings/integrations';
import {MainContainer, MainLayout} from '^clients/private/_layouts/MainLayout';
import {Breadcrumb, BreadcrumbPath} from '^clients/private/_layouts/_shared/Breadcrumb';
import {OrgSettingLeftListItem} from './OrgSettingsLeftListItem';
import {Building, CreditCard, Users, Grid2x2Plus} from 'lucide-react';
import {useTranslation} from 'next-i18next';

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
    const {t} = useTranslation('workspaceSettings');

    return (
        <MainLayout>
            <MainContainer>
                <Breadcrumb
                    paths={[
                        t('breadcrumb.settings') ?? '',
                        typeof breadcrumbPath === 'string'
                            ? t(breadcrumbPath) ?? ''
                            : {...breadcrumbPath, text: t(breadcrumbPath.text) ?? ''},
                    ]}
                />

                <div className={'grid grid-cols-5 gap-4 mt-4'}>
                    {/* 메뉴 영역 */}
                    <div className={'col-span-1'}>
                        <div className={''}>
                            <div className={'pt-2 px-4 text-12 text-gray-400 mb-2'}>{t('menu.general')}</div>
                            <div className={'text-sm mb-4'}>
                                <OrgSettingLeftListItem
                                    Icon={Building}
                                    name={t('menu.workspace-info')}
                                    href={OrgSettingsInformationPageRoute.path(orgId)}
                                    forceActive={activeMenuName}
                                />
                                <OrgSettingLeftListItem
                                    Icon={CreditCard}
                                    name={t('menu.subscription-payment')}
                                    href={OrgSettingsPaymentPageRoute.path(orgId)}
                                    forceActive={activeMenuName}
                                />
                            </div>

                            <div className={'pt-2 px-4 text-12 text-gray-400 mb-2'}>
                                {t('menu.management-integration')}
                            </div>
                            <div className={'text-sm'}>
                                <OrgSettingLeftListItem
                                    Icon={Users}
                                    name={t('menu.member-management')}
                                    href={OrgSettingsMemberPageRoute.path(orgId)}
                                    forceActive={activeMenuName}
                                />

                                {/*<OrgSettingLeftListItem Icon={WalletMinimal} name={t('menu.asset-connection')} href="#" />*/}

                                <OrgSettingLeftListItem
                                    Icon={Grid2x2Plus}
                                    name={t('menu.service-integration')}
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
                                {typeof breadcrumbPath === 'string' ? t(breadcrumbPath) : t(breadcrumbPath.text)}
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
