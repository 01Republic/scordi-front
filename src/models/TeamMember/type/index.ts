import {OrganizationDto} from '^types/organization.type';
import {UserDto} from '^models/User/types';
import {TeamDto} from '^models/Team/type';
import {FindAllQueryDto} from '^types/utils/findAll.query.dto';
import {TypeCast} from '^types/utils/class-transformer';
import {MembershipDto} from '^types/membership.type';

export class TeamMemberDto {
    id: number; // 아이디
    name: string; // 이름
    email?: string | null; // 이메일
    phone?: string | null; //
    jobName?: string | null; // 직무 이름
    jobDescription?: string | null; // 직무 설명
    notes?: string | null; // 메모, 비고
    profileImgUrl?: string | null; // 프로필 이미지 주소
    organizationId: number; // 스코디 조직 ID
    membership?: MembershipDto | null; // 멤버십 상세
    membershipId?: number | null; // 스코디 멤버십 ID

    @TypeCast(() => Date) createdAt: Date; // 생성일시
    @TypeCast(() => Date) updatedAt: Date; // 수정일시
    @TypeCast(() => OrganizationDto) organization: OrganizationDto; // 스코디 조직
    @TypeCast(() => UserDto) user?: UserDto | null; // 스코디 유저
    @TypeCast(() => TeamDto) teams: TeamDto[]; // 팀

    get profileImageUrl() {
        return this.profileImgUrl || `https://placehold.co/200x200?text=${this.name[0]}`;
    }

    makeTeamMemberProfile() {
        const user = this.user;

        return {
            name: this.name,
            email: this.email ?? user?.email ?? '',
            phone: this.phone ?? user?.phone ?? '',
            jobName: this.jobName,
            jobDescription: this.jobDescription,
            profileImgUrl:
                this.profileImgUrl ??
                user?.profileImgUrl ??
                `https://placehold.co/200x200?text=${encodeURIComponent(this.name)}`,
        };
    }
}

export type FindAllTeamMemberQueryDto = FindAllQueryDto<TeamMemberDto> & {
    teamId?: number | null;
    name?: string | null;
};

export type CreateTeamMemberDto = {
    name: string;
    email?: string | null;
    phone?: string | null;
    jobName?: string | null;
    jobDescription?: string | null;
    notes?: string | null;
    profileImgUrl?: string | null;
    userId?: number | null;
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
