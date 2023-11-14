import {OrganizationDto} from '^types/organization.type';
import {SubscriptionDto} from 'src/models/Subscription/types';
import {TagDto} from '^types/tag.type';
import {TeamMemberDto} from '^models/TeamMember/type';
import {FindAllQueryDto} from '^types/utils/findAll.query.dto';
import {TypeCast} from '^types/utils/class-transformer';

export class TeamDto {
    id: number;
    name: string;
    organizationId: number;

    @TypeCast(() => OrganizationDto)
    organization: OrganizationDto;

    @TypeCast(() => TeamMemberDto)
    members: TeamMemberDto[];

    @TypeCast(() => SubscriptionDto)
    subscriptions: SubscriptionDto[];

    // @TypeCast(() => TagDto)
    tags: TagDto[];
}

export class CreateTeamDto {
    name: string;
}

export class UpdateTeamDto {
    name?: string | null;
}

export class FindAllTeamQueryDto extends FindAllQueryDto<TeamDto> {}
