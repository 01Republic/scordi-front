import React, {memo} from 'react';
import {Avatar} from '^components/Avatar';
import {FaQuestion} from 'react-icons/fa6';
import {TeamMemberDto} from '^models/TeamMember/type';

interface MasterProfileProps {
    member?: TeamMemberDto;
}

export const MasterProfile = memo((props: MasterProfileProps) => {
    const {member} = props;

    if (!member) return <UndefinedMasterProfile />;

    return <UndefinedMasterProfile />;
});
MasterProfile.displayName = 'MasterProfile';

/**
 * 관리자가 지정되지 않은 경우, 관리자를 지정할 수 있도록 안내합니다.
 */
const UndefinedMasterProfile = memo(() => {
    const onClick = () => {
        alert('곧 완성될 기능이에요!\n열심히 개발하고 있으니 조금만 기다려주세요 :)');
    };

    return (
        <div
            className="flex items-center gap-2 cursor-pointer text-gray-400 hover:text-gray-500 transition-all"
            onClick={onClick}
        >
            <Avatar className="w-7">
                <FaQuestion size={24} className="h-full w-full p-[6px]" />
            </Avatar>
            <div className="flex-1 h-full">
                <p className="text-xs">
                    관리자를 <br /> 지정해주세요
                </p>
            </div>
        </div>
    );
});
