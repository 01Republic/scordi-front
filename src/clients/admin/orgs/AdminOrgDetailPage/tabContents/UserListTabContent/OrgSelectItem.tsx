import React, {memo, useEffect, useState} from 'react';
import {TeamMemberDto} from '^models/TeamMember';
import {BsCheckCircle, BsCheckCircleFill} from 'react-icons/bs';
import {TeamMemberAvatar} from '^v3/share/TeamMemberAvatar';
import {OrganizationDto} from '^models/Organization/type';

interface OrgSelectItemProps {
    item: OrganizationDto;
    selectedOrg: {id: number; name: string} | null;
    setSelectedOrg: (selected: {id: number; name: string}) => void;
}

export const OrgSelectItem = memo((props: OrgSelectItemProps) => {
    const {item, selectedOrg, setSelectedOrg} = props;

    const isSelected = selectedOrg?.id === item.id;

    return (
        <div
            onClick={() => setSelectedOrg({id: item.id, name: item.name})}
            className="flex items-center gap-4 px-4 py-3 -mx-4 no-selectable hover:bg-neutral rounded-box cursor-pointer group"
        >
            <div className="flex w-full itmes-center justify-between">
                <span>{item.name}</span>

                <div className="flex items-center">
                    <button className="relative">
                        {isSelected ? (
                            <BsCheckCircleFill size={24} strokeWidth={0.3} className="text-indigo-500" />
                        ) : (
                            <BsCheckCircle
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
