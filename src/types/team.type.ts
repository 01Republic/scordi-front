import {OrganizationDto} from '^types/organization.type';
import {SubscriptionDto} from '^types/subscription.type';
import {TagDto} from '^types/tag.type';
import {TeamMemberDto} from '^types/team-member.type';

export type TeamDto = {
    id: number;
    name: string;
    organizationId: number;
    organization: OrganizationDto;
    members: TeamMemberDto[];
    subscriptions: SubscriptionDto[];
    tags: TagDto[];
};

export type CreateTeamDto = {
    name: string;
};

export type UpdateTeamDto = {
    name?: string | null;
};
