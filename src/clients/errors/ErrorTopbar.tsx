import {OrgInfo} from '^layouts/org/mainLayout/OrgInfo';
import {ProfileDropDown} from '^layouts/org/mainLayout/ProfileDropDown';
import {sidebarActiveAtom} from '^layouts/org/mainLayout/Sidebar';
import {memo} from 'react';
import {TbLayoutSidebarLeftCollapse, TbLayoutSidebarRightCollapse} from 'react-icons/tb';
import {useRecoilState} from 'recoil';

export const ErrorTopbar = memo(() => {
    const [sidebarActive, setSidebarActive] = useRecoilState(sidebarActiveAtom);

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
            </div>
            <div className="flex-none gap-2">
                <ProfileDropDown />
            </div>
        </div>
    );
});
