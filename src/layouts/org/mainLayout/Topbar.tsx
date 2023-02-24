import React, {memo} from 'react';
import {useCurrentUser} from '^hooks/useCurrentUser';
import {OrgInfo} from './OrgInfo';
import {ProfileDropDown} from './ProfileDropDown';

export const OrgTopbar = memo(() => {
    const {currentUser} = useCurrentUser();

    if (!currentUser) return <></>;

    return (
        <div className="sticky top-0 navbar bg-white shadow z-[11] flex justify-between">
            <OrgInfo />
            <div className="flex-none gap-2">
                <ProfileDropDown />
            </div>
        </div>
    );
});
