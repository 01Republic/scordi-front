import {memo} from 'react';
import {TopNavItem} from '^v3/share/TobNav/TopNavItem';
import {V3OrgHomePageRoute} from '^pages/v3/orgs/[orgId]';
import {AiOutlineHome} from '@react-icons/all-files/ai/AiOutlineHome';
import {AiFillHome} from '@react-icons/all-files/ai/AiFillHome';
import {V3OrgAppsPageRoute} from '^pages/v3/orgs/[orgId]/apps';
import {AiOutlineAppstoreAdd} from '@react-icons/all-files/ai/AiOutlineAppstoreAdd';
import {AiFillAppstore} from '@react-icons/all-files/ai/AiFillAppstore';
import {V3OrgSettingsOrgPageRoute} from '^pages/v3/orgs/[orgId]/settings/org';
import {FiSettings} from '@react-icons/all-files/fi/FiSettings';
import {AiFillSetting} from '@react-icons/all-files/ai/AiFillSetting';
import {useSafePathInCurrentOrg} from '^hooks/useSafePath';
import {useRecoilValue} from 'recoil';
import {currentOrgAtom} from '^models/Organization/atom';

export const TopNavMenu = memo(function TopNavMenu() {
    const currentOrg = useRecoilValue(currentOrgAtom);
    const {safePath} = useSafePathInCurrentOrg();

    return (
        <ul className="menu menu-horizontal px-1 gap-10 hidden">
            <TopNavItem
                text="홈"
                href={safePath((org) => V3OrgHomePageRoute.path(org.id))}
                iconDefault={AiOutlineHome}
                iconActivated={AiFillHome}
                matched={/orgs\/\d+$/}
            />
            <TopNavItem
                text="앱"
                href={safePath((org) => V3OrgAppsPageRoute.path(org.id))}
                iconDefault={AiOutlineAppstoreAdd}
                iconActivated={AiFillAppstore}
            />
            {currentOrg && (
                <TopNavItem
                    text="관리"
                    href={safePath((org) => V3OrgSettingsOrgPageRoute.path(org.id))}
                    iconDefault={FiSettings}
                    iconActivated={AiFillSetting}
                    matched={V3OrgSettingsOrgPageRoute.path(currentOrg.id).replace(/\/org$/, '')}
                />
            )}
        </ul>
    );
});
