import React, {memo} from 'react';
import {useOrganization} from '^hooks/useOrganizations';

export const OrgInfo = memo(() => {
    const org = useOrganization();

    if (!org) return <></>;

    const orgName = org.name;

    return (
        <div className="flex items-center px-3">
            <div className="avatar placeholder inline-flex mr-2">
                <div className="bg-neutral-focus text-neutral-content rounded w-10">
                    <span className="font-bold">{`${orgName}`[0]}</span>
                </div>
            </div>
            <div className="flex-1 h-full">
                <p className="text-sm font-bold">{orgName}</p>
                <p className="text-xs text-gray-500">Free</p>
            </div>
        </div>
    );
});
