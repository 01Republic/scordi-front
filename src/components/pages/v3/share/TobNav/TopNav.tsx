import {memo, useCallback} from 'react';
import styles from '^styles/v3/V3MainLayout.module.scss';
import {TopNavLogo} from '^v3/share/TobNav/TopNavLogo';
import {TopNavProfileButton} from '^v3/share/TobNav/TopNavProfileButton';
import {useSetRecoilState} from 'recoil';
import {TopNavOrgSelect} from '^v3/share/TobNav/TopNavOrgSelect';
import {TopNavMenu} from '^v3/share/TobNav/TopNavMenu';
import {lnbHiddenAtom} from '^v3/share/LeftNavBar/atom';
import {useResize} from '^hooks/useOnResize';

export const V3TopNav = memo(() => {
    const setLNBHidden = useSetRecoilState(lnbHiddenAtom);
    const toggleLNB = useCallback(() => {
        setLNBHidden((prev) => !prev);
    }, []);

    useResize(({innerWidth}) => {
        setLNBHidden(() => innerWidth < 690);
    });

    return (
        <div className={`navbar flex bg-base-100 ${styles.gnb} fixed top-0 z-20`}>
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
            <div className="navbar-center hidden lg:flex">
                <TopNavMenu />
            </div>

            {/* 프로필 버튼 */}
            <div className="navbar-end gap-4">
                {/*<TopNavOrgSelect />*/}
                <TopNavProfileButton />
            </div>
        </div>
    );
});
