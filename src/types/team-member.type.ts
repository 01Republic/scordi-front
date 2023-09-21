import {OrganizationDto} from '^types/organization.type';
import {UserDto} from '^types/user.type';
import {AccountDto} from '^types/account.type';
import {TeamDto} from '^types/team.type';
import {FindAllQueryDto} from '^types/utils/findAll.query.dto';
import {TypeCast} from '^types/utils/class-transformer';

export class TeamMemberDto {
    id: number;
    name: string;
    email?: string | null;
    phone?: string | null;
    jobName?: string | null;
    jobDescription?: string | null;
    notes?: string | null;
    profileImgUrl?: string | null;
    organizationId: number;

    @TypeCast(() => OrganizationDto)
    organization: OrganizationDto;
    userId: number;

    @TypeCast(() => UserDto)
    user: UserDto;

    @TypeCast(() => TeamDto)
    teams: TeamDto[];
    permittedAccounts: AccountDto[];
    createdAt: string; // 생성일시
    updatedAt: string; // 수정일시
}

export type FindAllTeamMemberQueryDto = FindAllQueryDto<TeamMemberDto> & {
    teamId?: number;
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
