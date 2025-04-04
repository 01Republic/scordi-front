import {OrganizationDto} from '^models/Organization/type';
import {TypeCast} from '^types/utils/class-transformer';

export enum IntegrationProvider {
    slack = 'slack',
}

export class IntegrationWorkspaceDto<Provider = IntegrationProvider, AuthorizedResponse = any, ConfigContent = any> {
    id: number;
    organizationId: number; // 조직 ID
    provider: Provider; // 서비스명
    uid: string; // uid
    authorizedResponse: AuthorizedResponse; // 인증 결과 객체
    content: ConfigContent; // 서비스 통합 설정 내용

    @TypeCast(() => Date) createdAt: Date; // 생성일시
    @TypeCast(() => Date) updatedAt: Date; // 수정일시

    @TypeCast(() => OrganizationDto) organization?: OrganizationDto; // 조직
}

export class SlackWorkspace extends IntegrationWorkspaceDto<IntegrationProvider.slack> {
    //
}
