import {memo} from 'react';
import {IntegrationGoogleWorkspaceMemberDto} from '^models/integration/IntegrationGoogleWorkspaceMember/type/IntegrationGoogleWorkspaceMember.dto';
import {ConnectedTeamMemberTag} from './ConnectedTeamMemberTag';

interface TeamMemberConnectTriggerProps {
    item: IntegrationGoogleWorkspaceMemberDto;
    isLoading?: boolean;
}

export const TeamMemberConnectTrigger = memo((props: TeamMemberConnectTriggerProps) => {
    const {item, isLoading = false} = props;

    return (
        <div
            className={`border border-gray-100 rounded-lg bg-gray-100 py-1 pl-1 pr-4 w-full ${
                !item.isDeleted ? 'hover:bg-gray-200/90 cursor-pointer' : 'pointer-events-none'
            } transition-all flex items-center justify-between`}
        >
            <div className="flex items-center">
                {isLoading ? (
                    <div className="flex items-center">
                        <div className="w-4 h-4 border-2 border-gray-300 border-t-blue-500 rounded-full animate-spin mr-2"></div>
                        <span className="text-gray-500 text-sm">처리 중...</span>
                    </div>
                ) : item.teamMemberId ? (
                    item.teamMember ? (
                        <ConnectedTeamMemberTag teamMember={item.teamMember} />
                    ) : (
                        <div className="text-gray-400">Load Error.</div>
                    )
                ) : (
                    <div className="text-gray-500 opacity-40">선택해주세요</div>
                )}
            </div>
        </div>
    );
});
TeamMemberConnectTrigger.displayName = 'TeamMemberConnectTrigger';