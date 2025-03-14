import React, {memo, useEffect, useState} from 'react';
import {TeamMemberDto} from '^models/TeamMember';
import {TeamMemberAvatar} from '^v3/share/TeamMemberAvatar';
import {OrganizationDto} from '^models/Organization/type';
import {CheckCircle} from 'lucide-react';

interface OrgSelectItemProps {
    item: OrganizationDto;
    disabled?: boolean;
    onClick: (organization: OrganizationDto) => any;
}

export const OrgSelectItem = memo((props: OrgSelectItemProps) => {
    const {item: organization, disabled = false, onClick} = props;

    return (
        <div
            onClick={() => !disabled && onClick(organization)}
            className="flex items-center gap-4 px-4 py-3 -mx-4 no-selectable hover:bg-neutral rounded-box cursor-pointer group"
        >
            <div className="flex w-full itmes-center justify-between">
                <div className="flex items-center gap-1">
                    <span className="text-gray-400">(#{organization.id})</span>
                    <span>{organization.name}</span>
                </div>

                <div className="flex items-center">
                    <button className="relative">
                        {disabled ? (
                            <CheckCircle size={24} strokeWidth={0.3} className="text-indigo-500" />
                        ) : (
                            <CheckCircle
                                size={24}
                                strokeWidth={0.3}
                                className="text-indigo-200 group-hover:text-indigo-300"
                            />
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
});
OrgSelectItem.displayName = 'TeamMemberSelectItem';
