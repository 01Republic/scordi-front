import {OrganizationDto} from '^types/organization.type';
import {UserDto} from '^types/user.type';
import {AccountDto} from '^types/account.type';
import {TeamDto} from '^types/team.type';

export type TeamMemberDto = {
    id: number;
    name: string;
    email?: string | null;
    phone?: string | null;
    jobName?: string | null;
    jobDescription?: string | null;
    notes?: string | null;
    profileImgUrl?: string | null;
    organizationId: number;
    organization: OrganizationDto;
    userId: number;
    user: UserDto;
    teams: TeamDto[];
    permittedAccounts: AccountDto[];
};

export type CreateTeamMemberDto = {
    name: string;
    email?: string | null;
    phone?: string | null;
    jobName?: string | null;
    jobDescription?: string | null;
    notes?: string | null;
    profileImgUrl?: string | null;
    userId: number;
};

export type UpdateTeamMemberDto = {
    name?: string;
    email?: string | null;
    phone?: string | null;
    jobName?: string | null;
    jobDescription?: string | null;
    notes?: string | null;
    profileImgUrl?: string | null;
};
