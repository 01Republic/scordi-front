import {memo} from 'react';
import {TeamMemberDto} from '^models/TeamMember';
import {IntegrationSlackMemberDto} from '^models/integration/IntegrationSlackMember/type/IntegrationSlackMember.dto';
import {TeamMemberSelectItem} from './TeamMemberSelectItem';

interface TeamMemberConnectDropdownContentProps {
    isLoading: boolean;
    sortedTeamMembers: TeamMemberDto[];
    item: IntegrationSlackMemberDto;
    onSelectTeamMember: (teamMember: TeamMemberDto) => void;
}

export const TeamMemberConnectDropdownContent = memo((props: TeamMemberConnectDropdownContentProps) => {
    const {isLoading, sortedTeamMembers, item, onSelectTeamMember} = props;

    return (
        <div className="w-full min-w-[10rem] border border-gray-300 bg-white overflow-hidden rounded-md shadow-lg">
            <div className="max-h-60 overflow-y-auto">
                {isLoading ? (
                    <div className="flex items-center justify-center py-8 text-gray-500">
                        <div className="w-4 h-4 border-2 border-gray-300 border-t-blue-500 rounded-full animate-spin mr-2"></div>
                        <span>팀멤버 로딩 중...</span>
                    </div>
                ) : sortedTeamMembers.length ? (
                    sortedTeamMembers.map((teamMember) => (
                        <TeamMemberSelectItem
                            key={teamMember.id}
                            teamMember={teamMember}
                            item={item}
                            onSelect={onSelectTeamMember}
                        />
                    ))
                ) : (
                    <div className="py-8 text-center text-gray-500">
                        <div className="text-sm font-medium">팀멤버가 없습니다</div>
                        <div className="text-xs mt-1">먼저 팀멤버를 추가해주세요</div>
                    </div>
                )}
            </div>
        </div>
    );
});
TeamMemberConnectDropdownContent.displayName = 'TeamMemberConnectDropdownContent';