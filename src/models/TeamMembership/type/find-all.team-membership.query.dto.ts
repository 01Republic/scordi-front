import {FindAllQueryDto} from '^types/utils/findAll.query.dto';
import {TeamMembershipDto} from './TeamMemberships.dto';

export class FindAllTeamMembershipQueryDto extends FindAllQueryDto<TeamMembershipDto> {
    keyword?: string;
}
