import {memo, useCallback} from 'react';
import styles from '^styles/v3/V3MainLayout.module.scss';
import {TopNavLogo} from '^v3/share/TobNav/TopNavLogo';
import {TopNavProfileButton} from '^v3/share/TobNav/TopNavProfileButton';
import {TopNavItem} from '^v3/share/TobNav/TopNavItem';
import {V3OrgHomePageRoute} from '^pages/v3/orgs/[orgId]';
import {V3OrgAppsPageRoute} from '^pages/v3/orgs/[orgId]/apps';
import {V3OrgSettingsOrgPageRoute} from '^pages/v3/orgs/[orgId]/settings/org';
import {AiFillHome} from '@react-icons/all-files/ai/AiFillHome';
import {AiOutlineAppstoreAdd} from '@react-icons/all-files/ai/AiOutlineAppstoreAdd';
import {FiSettings} from '@react-icons/all-files/fi/FiSettings';
import {AiOutlineHome} from '@react-icons/all-files/ai/AiOutlineHome';
import {AiFillSetting} from '@react-icons/all-files/ai/AiFillSetting';
import {AiFillAppstore} from '@react-icons/all-files/ai/AiFillAppstore';
import {currentOrgAtom} from '^models/Organization/atom';
import {useRecoilValue, useSetRecoilState} from 'recoil';
import {TopNavOrgSelect} from '^v3/share/TobNav/TopNavOrgSelect';
import {lnbHiddenAtom} from '^v3/share/LeftNavBar/atom';

export const V3TopNav = memo(() => {
    const currentOrg = useRecoilValue(currentOrgAtom);
    const setLNBHidden = useSetRecoilState(lnbHiddenAtom);
    const toggleLNB = useCallback(() => {
        setLNBHidden((prev) => !prev);
    }, []);

    if (!currentOrg) return <></>;

    return (
        <div className={`navbar hidden sm:flex bg-base-100 ${styles.gnb} fixed top-0 z-20`}>
            {/* 로고 */}
            <div className="navbar-start">
                <label tabIndex={0} className="btn btn-ghost" onClick={() => toggleLNB()}>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
                    </svg>
                </label>
                <TopNavLogo />
            </div>

            {/* 본 메뉴 */}
            {currentOrg && (
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1 gap-10 hidden">
                        <TopNavItem
                            text="홈"
                            href={V3OrgHomePageRoute.path(currentOrg.id)}
                            iconDefault={AiOutlineHome}
                            iconActivated={AiFillHome}
                            matched={/orgs\/\d+$/}
                        />
                        <TopNavItem
                            text="앱"
                            href={V3OrgAppsPageRoute.path(currentOrg.id)}
                            iconDefault={AiOutlineAppstoreAdd}
                            iconActivated={AiFillAppstore}
                        />
                        <TopNavItem
                            text="관리"
                            href={V3OrgSettingsOrgPageRoute.path(currentOrg.id)}
                            iconDefault={FiSettings}
                            iconActivated={AiFillSetting}
                            matched={V3OrgSettingsOrgPageRoute.path(currentOrg.id).replace(/\/org$/, '')}
                        />
                    </ul>
                </div>
            )}

            {/* 프로필 버튼 */}
            <div className="navbar-end gap-4">
                {/*<TopNavOrgSelect />*/}
                <TopNavProfileButton />
            </div>
        </div>
    );
});
