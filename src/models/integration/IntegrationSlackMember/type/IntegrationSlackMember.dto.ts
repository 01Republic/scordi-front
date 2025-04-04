import {TypeCast} from '^types/utils/class-transformer';
import {IntegrationWorkspaceDto} from '^models/IntegrationWorkspace/type';
import {TeamMemberDto} from '^models/TeamMember';
import {SlackMember} from './SlackMember';

/**
 * 슬랙계정
 */
export class IntegrationSlackMemberDto {
    // 슬랙 워크스페이스 FK
    integrationWorkspaceId: number;
    // 연결된 팀멤버 FK
    teamMemberId: number | null;
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

    @TypeCast(() => IntegrationWorkspaceDto) integrationWorkspace?: IntegrationWorkspaceDto; // 슬랙 워크스페이스
    @TypeCast(() => TeamMemberDto) teamMember?: TeamMemberDto; // 연결된 팀멤버
}
