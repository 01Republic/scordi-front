import React, {memo} from 'react';
import {useCurrentUser} from '^hooks/useCurrentUser';
import {OrgInfo} from './OrgInfo';
import {ProfileDropDown} from './ProfileDropDown';
import {TbLayoutSidebarLeftCollapse, TbLayoutSidebarRightCollapse} from 'react-icons/tb';
import {useRecoilState} from 'recoil';
import {sidebarActiveAtom} from '^layouts/org/mainLayout/Sidebar';

export const OrgTopbar = memo(() => {
    const {currentUser} = useCurrentUser();
    const [sidebarActive, setSidebarActive] = useRecoilState(sidebarActiveAtom);

    if (!currentUser) return <></>;

    return (
        <div className="sticky top-0 navbar bg-white shadow z-[21] flex justify-between">
            <div className="flex">
                <button className="btn btn-ghost btn-square" onClick={() => setSidebarActive(!sidebarActive)}>
                    {sidebarActive ? (
                        <TbLayoutSidebarLeftCollapse size={24} />
                    ) : (
                        <TbLayoutSidebarRightCollapse size={24} />
                    )}
                </button>
                <OrgInfo />
            </div>
            <div className="flex-none gap-2">
                <ProfileDropDown />
            </div>
        </div>
    );
});
