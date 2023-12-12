import React, {memo} from 'react';
import {useOrganization} from '^models/Organization/hook';

export const OrgInfo = memo(() => {
    const org = useOrganization();

    if (!org) return <></>;

    const {name, image} = org;

    return (
        <div className="flex items-center px-3">
            {image ? (
                <div className="avatar inline-flex mr-2">
                    <div className="border rounded w-10">
                        <img src={image} />
                    </div>
                </div>
            ) : (
                <div className="avatar placeholder inline-flex mr-2">
                    <div className="bg-neutral-focus text-neutral-content border rounded w-10">
                        <span className="font-bold">{`${name}`[0]}</span>
                    </div>
                </div>
            )}
            <div className="flex-1 h-full">
                <p className="text-sm font-bold">{name}</p>
                <p className="text-xs text-gray-500">Free</p>
            </div>
        </div>
    );
});
