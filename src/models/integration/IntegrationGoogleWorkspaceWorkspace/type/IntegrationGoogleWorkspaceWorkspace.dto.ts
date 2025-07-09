import {IntegrationProvider} from '^models/IntegrationWorkspace/type';
import {TypeCast} from '^types/utils/class-transformer';
import {OrganizationDto} from '^models/Organization/type';
import {GoogleTokenDataSecureDto} from '^models/GoogleTokenData/type';
import {IntegrationGoogleWorkspaceMemberDto} from '../../IntegrationGoogleWorkspaceMember/type/IntegrationGoogleWorkspaceMember.dto';
import {GoogleAdminDirectoryOrgDto} from './GoogleAdminDirectoryOrg.dto';

class GoogleAdminAuthAndOrgDto {
    @TypeCast(() => GoogleTokenDataSecureDto)
    googleTokenData: GoogleTokenDataSecureDto;

    @TypeCast(() => GoogleAdminDirectoryOrgDto)
    adminDirectoryOrg: GoogleAdminDirectoryOrgDto;
}

/**
 * 구글워크스페이스 워크스페이스 (extends 통합된 외부서비스의 워크스페이스)
 */
export class IntegrationGoogleWorkspaceWorkspaceDto {
    id: number; // ID
    organizationId: number; // 조직 ID
    provider: IntegrationProvider.googleWorkspace; // 서비스명
    uid: string; // 워크스페이스 식별키
    workspaceName: string; // 워크스페이스 이름
    @TypeCast(() => GoogleAdminAuthAndOrgDto) authorizedResponse: GoogleAdminAuthAndOrgDto; // 인증 결과 객체
    content: any; // 서비스 통합 설정 내용
    @TypeCast(() => Date) createdAt: Date; // 생성일시
    @TypeCast(() => Date) updatedAt: Date; // 수정일시

    @TypeCast(() => OrganizationDto) organization?: OrganizationDto; // 조직
    @TypeCast(() => IntegrationGoogleWorkspaceMemberDto) googleMembers?: IntegrationGoogleWorkspaceMemberDto[]; // 구글 유저

    get unitId() {
        return this.uid.replace('id:', '');
    }
    // get workspaceName() {
    //     return this.authorizedResponse.team?.name;
    // }
}
