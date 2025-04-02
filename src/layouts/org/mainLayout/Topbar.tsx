import React, {memo} from 'react';
import {useCurrentUser} from '^models/User/hook';
import {OrgInfo} from './OrgInfo';
import {ProfileDropDown} from './ProfileDropDown';
import {useRecoilState} from 'recoil';
import {sidebarActiveAtom} from '^layouts/org/mainLayout/Sidebar';
import {LayoutPanelLeft} from 'lucide-react';

export const OrgTopbar = memo(() => {
    const {currentUser} = useCurrentUser();
    const [sidebarActive, setSidebarActive] = useRecoilState(sidebarActiveAtom);

    if (!currentUser) return <></>;

    return (
        <div className="sticky top-0 navbar bg-white shadow z-[21] flex justify-between">
            <div className="flex">
                <button className="btn btn-ghost btn-square" onClick={() => setSidebarActive(!sidebarActive)}>
                    {sidebarActive ? <LayoutPanelLeft size={24} /> : <LayoutPanelLeft size={24} />}
                </button>
                <OrgInfo />
            </div>
            <div className="flex-none gap-2">
                <ProfileDropDown />
            </div>
        </div>
    );
});
