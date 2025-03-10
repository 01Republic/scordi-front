import {memo} from 'react';
import {TopNavItem} from '^v3/share/TobNav/TopNavItem';
import {V3OrgHomePageRoute} from '^pages/v3/orgs/[orgId]';
import {V3OrgAppsPageRoute} from '^pages/v3/orgs/[orgId]/apps';
import {V3OrgSettingsOrgPageRoute} from '^pages/v3/orgs/[orgId]/settings/org';
import {useSafePathInCurrentOrg} from '^hooks/useSafePath';
import {useRecoilValue} from 'recoil';
import {currentOrgAtom} from '^models/Organization/atom';
import {AppWindow, Home, Settings} from 'lucide-react';

export const TopNavMenu = memo(function TopNavMenu() {
    const currentOrg = useRecoilValue(currentOrgAtom);
    const {safePath} = useSafePathInCurrentOrg();

    return (
        <ul className="menu menu-horizontal px-1 gap-10 hidden">
            <TopNavItem
                text="홈"
                href={safePath((org) => V3OrgHomePageRoute.path(org.id))}
                iconDefault={Home}
                iconActivated={Home}
                matched={/orgs\/\d+$/}
            />
            <TopNavItem
                text="앱"
                href={safePath((org) => V3OrgAppsPageRoute.path(org.id))}
                iconDefault={AppWindow}
                iconActivated={AppWindow}
            />
            {currentOrg && (
                <TopNavItem
                    text="관리"
                    href={safePath((org) => V3OrgSettingsOrgPageRoute.path(org.id))}
                    iconDefault={Settings}
                    iconActivated={Settings}
                    matched={V3OrgSettingsOrgPageRoute.path(currentOrg.id).replace(/\/org$/, '')}
                />
            )}
        </ul>
    );
});
