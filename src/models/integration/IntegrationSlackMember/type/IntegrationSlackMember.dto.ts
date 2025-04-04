import {TypeCast} from '^types/utils/class-transformer';
import {IntegrationWorkspaceDto} from '^models/IntegrationWorkspace/type';
import {TeamMemberDto} from '^models/TeamMember';
import {SlackMember} from './SlackMember';

/**
 * 슬랙계정
 */
export class IntegrationSlackMemberDto {
    id: number; // ID
    integrationWorkspaceId: number; // 슬랙 워크스페이스 FK
    teamMemberId: number | null; // 연결된 팀멤버 FK
    slackId: string;
    email: string | null;
    phone: string | null;
    imageUrl: string | null;
    isDeleted: boolean;
    isAdmin: boolean;
    isOwner: boolean;
    isPrimaryOwner: boolean;
    isRestricted: boolean;
    name: string;
    realName: string | null;
    displayName: string | null;
    @TypeCast(() => SlackMember) response: SlackMember;
    @TypeCast(() => Date) createdAt: Date; // 생성일시
    @TypeCast(() => Date) updatedAt: Date; // 수정일시

    @TypeCast(() => IntegrationWorkspaceDto) integrationWorkspace?: IntegrationWorkspaceDto; // 슬랙 워크스페이스
    @TypeCast(() => TeamMemberDto) teamMember?: TeamMemberDto; // 연결된 팀멤버

    get levelName() {
        if (this.isOwner) return '워크스페이스 소유자';
        if (this.isAdmin) return '워크스페이스 관리자';
        if (this.response.is_ultra_restricted) return '단일 채널 게스트';
        if (this.isRestricted) return '멀티 채널 게스트';
        return '정식 멤버';
    }

    get isActive() {
        return !this.isDeleted;
    }
}
