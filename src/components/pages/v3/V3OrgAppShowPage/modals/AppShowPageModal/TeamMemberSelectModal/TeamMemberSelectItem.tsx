import React, {memo, useEffect, useState} from 'react';
import {TeamMemberDto} from '^models/TeamMember';
import {BsCheckCircle, BsCheckCircleFill} from 'react-icons/bs';
import {TeamMemberAvatar} from '^v3/share/TeamMemberAvatar';

interface TeamMemberSelectItemProps {
    item: TeamMemberDto;
    onClick: (selected: TeamMemberDto) => any;
    isModalShown: boolean;
}

export const TeamMemberSelectItem = memo((props: TeamMemberSelectItemProps) => {
    const [isSelected, setSelected] = useState(false);
    const {item, onClick: _onClick, isModalShown} = props;

    useEffect(() => {
        if (!isModalShown) {
            setSelected(false);
        }
    }, [isModalShown]);

    const onClick = () => {
        setSelected((v) => !v);
        _onClick(item);
    };

    return (
        <div
            onClick={onClick}
            className="flex items-center gap-4 px-4 py-3 -mx-4 no-selectable hover:bg-neutral rounded-box cursor-pointer group"
        >
            <TeamMemberAvatar
                teamMember={item}
                className="w-9 h-9 outline outline-offset-1 outline-slate-100 rounded-full"
            />

            <div className="flex-1">
                <p className="font-semibold text-gray-800 max-w-[20rem] overflow-x-auto no-scrollbar leading-none mb-1">
                    {item.name}
                </p>
                <p className="text-xs text-gray-400">{item.email || <i className="opacity-70">no email</i>}</p>
            </div>

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
    );
});
TeamMemberSelectItem.displayName = 'TeamMemberSelectItem';
