import {TypeCast} from '^types/utils/class-transformer';
import {OrganizationDto} from '^models/Organization/type';
import {OauthV2AccessResponse} from '@slack/web-api';
import {IntegrationProvider} from '^models/IntegrationWorkspace/type';
import {IntegrationSlackMemberDto} from '^models/integration/IntegrationSlackMember/type/IntegrationSlackMember.dto';

/**
 * 슬랙 워크스페이스 (extends 통합된 외부서비스의 워크스페이스)
 */
export class IntegrationSlackWorkspaceDto {
    id: number; // ID
    organizationId: number; // 조직 ID
    provider: IntegrationProvider.slack; // 서비스명
    uid: string; // 워크스페이스 식별키
    authorizedResponse: OauthV2AccessResponse; // 인증 결과 객체
    content: any; // 서비스 통합 설정 내용
    @TypeCast(() => Date) createdAt: Date; // 생성일시
    @TypeCast(() => Date) updatedAt: Date; // 수정일시

    @TypeCast(() => OrganizationDto) organization?: OrganizationDto; // 조직
    @TypeCast(() => IntegrationSlackMemberDto) slackMembers?: IntegrationSlackMemberDto[]; // 슬랙 유저

    get workspaceName() {
        return this.authorizedResponse.team?.name;
    }
}
