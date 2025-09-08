import {memo} from 'react';
import {Check} from 'lucide-react';
import {TeamMemberDto} from '^models/TeamMember';
import {IntegrationSlackMemberDto} from '^models/integration/IntegrationSlackMember/type/IntegrationSlackMember.dto';
import {TeamMemberAvatar} from '^components/pages/v3/share/TeamMemberAvatar';

interface TeamMemberSelectItemProps {
    teamMember: TeamMemberDto;
    item: IntegrationSlackMemberDto;
    onSelect: (teamMember: TeamMemberDto) => void;
}

export const TeamMemberSelectItem = memo((props: TeamMemberSelectItemProps) => {
    const {teamMember, item, onSelect} = props;
    
    const isSelected = item.teamMemberId === teamMember.id;
    const isDisabled = teamMember.slackMember && !isSelected; // 이미 다른 슬랙멤버와 연결된 팀멤버인 경우

    return (
        <div
            className={`px-4 py-3 flex items-center justify-between ${
                isDisabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer hover:bg-scordi-50'
            } ${isSelected ? 'bg-blue-50 border-l-2 border-blue-500' : ''}`}
            onClick={() => {
                if (!isDisabled) {
                    onSelect(teamMember);
                }
            }}
        >
            <div className="flex items-center space-x-3">
                <TeamMemberAvatar teamMember={teamMember} className="w-[20px] h-[20px] text-12" />
                <div className={`text-14 font-medium ${isSelected ? 'text-blue-700' : ''}`}>
                    {teamMember.name}
                </div>
            </div>
            {isSelected && (
                <Check className="h-4 w-4 text-blue-500" />
            )}
        </div>
    );
});
TeamMemberSelectItem.displayName = 'TeamMemberSelectItem';