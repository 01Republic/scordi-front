import React, {memo} from 'react';
import {V3MainLayout} from '^v3/layouts/V3MainLayout';
import {useRecoilValue} from 'recoil';
import {currentOrgAtom} from '^models/Organization/atom';
import {useTranslation} from 'next-i18next';
import {useOnResize2} from '^components/util/onResize2';
import {V3MainLayoutMobile} from '^v3/layouts/V3MainLayout.mobile';
import {BottomTabIndex} from '^v3/share/BottomNavMobile';
import {LNBIndex} from '^v3/share/LeftNavBar';

/**
 * 팀 기능 추가시 업데이트 필요함.
 */
export const V3OrgTeamsPage = memo(() => {
    const currentOrg = useRecoilValue(currentOrgAtom);
    const {t} = useTranslation('org-home');
    const {isDesktop} = useOnResize2();

    if (isDesktop) {
        return (
            <V3MainLayout activeTabIndex={LNBIndex.Members}>
                <div>
                    <p>V3OrgTeamsPage</p>
                </div>
            </V3MainLayout>
        );
    } else {
        return (
            <V3MainLayoutMobile title={currentOrg?.name} activeTabIndex={BottomTabIndex.MEMBERS}>
                <div></div>
            </V3MainLayoutMobile>
        );
    }
});
