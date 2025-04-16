import {memo} from 'react';
import {ChevronDown} from 'lucide-react';
import {WithChildren} from '^types/global.type';
import {IntegrationSlackMemberDto} from '^models/integration/IntegrationSlackMember/type/IntegrationSlackMember.dto';
import {ConnectedTeamMemberTag} from './ConnectedTeamMemberTag';

interface TeamMemberConnectDropdownProps extends WithChildren {
    item: IntegrationSlackMemberDto;
}

export const TeamMemberConnectDropdown = memo((props: TeamMemberConnectDropdownProps) => {
    const {item, children} = props;

    return (
        <div
            className={`border border-gray-100 rounded-lg bg-gray-100 py-1 pl-1 pr-4 w-full ${
                !item.isDeleted ? 'hover:bg-gray-200/90 cursor-pointer' : 'pointer-events-none'
            } transition-all flex items-center justify-between`}
        >
            <div>
                {item.teamMemberId ? (
                    item.teamMember ? (
                        <ConnectedTeamMemberTag teamMember={item.teamMember} />
                    ) : (
                        <div className="text-gray-400">Load Error.</div>
                    )
                ) : (
                    <div className="text-gray-500 opacity-40">선택해주세요</div>
                )}
            </div>

            {/*<div className="">*/}
            {/*    <ChevronDown />*/}
            {/*</div>*/}
        </div>
    );
});
TeamMemberConnectDropdown.displayName = 'TeamMemberConnectDropdown';
