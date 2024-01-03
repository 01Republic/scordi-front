import {TeamMemberDto} from '^models/TeamMember/type';
import React, {memo, MouseEventHandler} from 'react';
import {Avatar} from '^components/Avatar';
import {FaQuestion} from 'react-icons/fa6';

interface MasterProfileOptionProps {
    member?: TeamMemberDto;
    onClick?: (id: number) => void;
}

export const MasterProfileOption = memo((props: MasterProfileOptionProps) => {
    const {member, onClick} = props;

    return (
        <div className="flex items-center gap-2 cursor-pointer text-gray-400 hover:text-gray-500 transition-all">
            {member ? (
                <>
                    <Avatar className="w-7" src={member.profileImgUrl ?? ''}></Avatar>
                    <div className="flex-1 h-full" onClick={() => onClick && onClick(member.id)}>
                        <p className="text-sm">{member.name}</p>
                    </div>
                </>
            ) : (
                <>
                    <Avatar className="w-7">
                        <FaQuestion size={24} className="h-full w-full p-[6px]" />
                    </Avatar>
                    <div className="flex-1 h-full">
                        <p className="text-xs">
                            관리자를 <br /> 지정해주세요
                        </p>
                    </div>
                </>
            )}
        </div>
    );
});
