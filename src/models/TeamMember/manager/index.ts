import {BasicManager} from '^models/BasicManager';
import {TeamMemberDto} from '^models/TeamMember/type';

export class TeamMemberManager extends BasicManager<TeamMemberDto> {
    sortByCreatedAtDescending(teamMembers: TeamMemberDto[]) {
        const newTeamMembers = [...teamMembers];
        return newTeamMembers.sort((a, b) => {
            const dateA: number = new Date(a.createdAt).valueOf();
            const dateB: number = new Date(b.createdAt).valueOf();

            return dateB - dateA;
        });
    }
}
