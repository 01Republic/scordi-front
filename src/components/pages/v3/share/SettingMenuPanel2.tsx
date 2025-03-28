import React, {memo} from 'react';
import {ActiveLinkTo} from '^v3/share/ActiveLinkTo';
import {orgIdParamState, useRouterIdParamState} from '^atoms/common';
import {V3OrgSettingsOrgPageRoute} from '^pages/v3/orgs/[orgId]/settings/org';
import {V3OrgSettingsBillingPageRoute} from '^pages/v3/orgs/[orgId]/settings/billing';
import {V3OrgSettingsMembersPageRoute} from '^pages/v3/orgs/[orgId]/settings/members';
import {useRouter} from 'next/router';
import {V3OrgHomePageRoute} from '^pages/v3/orgs/[orgId]';
import {V3OrgSettingsConnectsPageRoute} from '^pages/v3/orgs/[orgId]/settings/connects';
import {Building2, CreditCard, Key, Plug, Users} from 'lucide-react';

export const V3OrgSettingsMenuPanel = memo(() => {
    const router = useRouter();
    const orgId = useRouterIdParamState('orgId', orgIdParamState);

    const goHome = () => router.push(V3OrgHomePageRoute.path(orgId));

    return (
        <ul className="menu bg-base-100 w-full shadow-lg py-8 px-5 rounded-box">
            <li className="mb-7">
                <span className="p-0 text-lg font-semibold !bg-white !text-gray-900" onClick={goHome}>
                    제로원리퍼블릭
                </span>
            </li>
            <li>
                <ActiveLinkTo href={V3OrgSettingsOrgPageRoute.path(orgId)} className="mb-0.5">
                    <Building2 />
                    <span>워크스페이스 정보</span>
                </ActiveLinkTo>
            </li>
            <li>
                <ActiveLinkTo href={V3OrgSettingsBillingPageRoute.path(orgId)} className="mb-0.5">
                    <CreditCard />
                    <span>결제 관리</span>
                </ActiveLinkTo>
            </li>
            {/*<li>*/}
            {/*    <ActiveLinkTo href={V3OrgSettingsMembersPageRoute.path(orgId)} className="mb-0.5">*/}
            {/*        <Users />*/}
            {/*        <span>멤버 관리</span>*/}
            {/*    </ActiveLinkTo>*/}
            {/*</li>*/}
            <li>
                <ActiveLinkTo href={V3OrgSettingsConnectsPageRoute.path(orgId)} className="mb-0.5">
                    <Plug size={18} />
                    <span>연동 관리</span>
                </ActiveLinkTo>
            </li>
        </ul>
    );
});
