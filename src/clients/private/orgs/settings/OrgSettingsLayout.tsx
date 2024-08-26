import React, {memo} from 'react';
import {orgIdParamState, useRouterIdParamState} from '^atoms/common';
import {MainContainer, MainLayout} from '^clients/private/_layouts/MainLayout';
import {Breadcrumb} from '^clients/private/_layouts/_shared/Breadcrumb';
import {WithChildren} from '^types/global.type';
import {BsBuildingFill, BsCreditCard, BsPeopleFill} from 'react-icons/bs';
import Link from 'next/link';
import {Icon} from '^components/Icon';
import {useRouter} from 'next/router';
import {OrgSettingsInformationPageRoute} from '^pages/orgs/[id]/settings';
import {IconType} from '@react-icons/all-files';
import {OrgSettingsPaymentPageRoute} from '^pages/orgs/[id]/settings/payments';
import {OrgSettingsMemberPageRoute} from '^pages/orgs/[id]/settings/members';

type OrgSettingsLayoutProps = WithChildren;

export const OrgSettingsLayout = memo(function OrgSettingsLayout(props: OrgSettingsLayoutProps) {
    const {children} = props;
    const orgId = useRouterIdParamState('id', orgIdParamState);

    return (
        <MainLayout>
            <MainContainer>
                <Breadcrumb paths={['설정', {text: '팀 목록', active: false, href: `/orgs/${orgId}/teams`}]} />
                <div className={'grid grid-cols-4 gap-4 mt-4'}>
                    <div className={'col-span-1'}>
                        <div className={'card border rounded-lg bg-white p-6'}>
                            <div className={'text-lg mt-4 font-bold mb-6'}>규리의 워크스페이스</div>
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

interface OrgSettingLeftListItemProps {
    Icon: IconType;
    name: string;
    href: string;
}

const OrgSettingLeftListItem = memo(function (props: OrgSettingLeftListItemProps) {
    const {Icon, name, href} = props;
    const router = useRouter();

    const isActive = href === router.asPath;

    return (
        <Link href={href}>
            <div
                className={`flex items-center px-4 py-3 mb-1 rounded-2xl hover:bg-gray-50 cursor-pointer ${
                    isActive ? `bg-gray-50` : ``
                }`}
            >
                <Icon className={`mr-3 ${isActive ? `text-scordi` : ``}`} />
                <span className={`${isActive ? `text-scordi` : ``}`}>{name}</span>
            </div>
        </Link>
    );
});
