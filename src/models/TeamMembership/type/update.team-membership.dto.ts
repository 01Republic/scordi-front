import {PartialType} from '^types/utils/partial-type';
import {CreateTeamMembershipDto} from './create.team-membership.dto';

export class UpdateTeamMembershipDto extends PartialType(CreateTeamMembershipDto) {}
