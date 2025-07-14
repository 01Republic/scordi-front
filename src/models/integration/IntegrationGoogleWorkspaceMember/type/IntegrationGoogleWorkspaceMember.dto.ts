import {TypeCast} from '^types/utils/class-transformer';
import {TeamMemberDto} from '^models/TeamMember';
import {IntegrationWorkspaceDto} from '^models/IntegrationWorkspace/type';
import {GoogleAdminDirectoryUser} from './GoogleAdminDirectoryUser';

/**
 * 구글워크스페이스 멤버계정
 */
export class IntegrationGoogleWorkspaceMemberDto {
    id: number; // ID
    integrationWorkspaceId: number; // 워크스페이스 FK
    teamMemberId: number | null; // 연결된 팀멤버 FK
    googleWorkspaceId: string;
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
    subscriptionCount: number; // 구독 수
    @TypeCast(() => GoogleAdminDirectoryUser) response: GoogleAdminDirectoryUser; // 구글 워크스페이스 멤버데이터
    @TypeCast(() => Date) createdAt: Date; // 생성일시
    @TypeCast(() => Date) updatedAt: Date; // 수정일시

    @TypeCast(() => IntegrationWorkspaceDto) integrationWorkspace?: IntegrationWorkspaceDto; // 워크스페이스
    @TypeCast(() => TeamMemberDto) teamMember?: TeamMemberDto; // 연결된 팀멤버

    get levelName() {
        if (this.isPrimaryOwner) return '최고 관리자';
        if (this.isOwner) return '관리자';
        if (this.isAdmin) return '관리자';
        return '구성원';
    }

    get isActive() {
        return !this.isDeleted;
    }
}
