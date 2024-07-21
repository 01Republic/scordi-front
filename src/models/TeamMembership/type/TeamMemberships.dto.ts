import {TypeCast} from '^types/utils/class-transformer';
import {TeamDto} from '^models/Team/type';
import {TeamMemberDto} from '^models/TeamMember';

export class TeamMembershipDto {
    // id: number; // TODO: 곧 생길 예정
    teamId: number; // 팀 ID
    teamMemberId: number; // 팀 멤버 ID
    // @TypeCase(() => Date) createdAt: Date; // TODO: 곧 생길 예정
    // @TypeCase(() => Date) updatedAt: Data; // TODO: 곧 생길 예정

    // relations
    @TypeCast(() => TeamDto) team?: TeamDto; // 팀
    @TypeCast(() => TeamMemberDto) teamMember?: TeamMemberDto; // 팀 멤버
}
