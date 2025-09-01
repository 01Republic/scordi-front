import {TypeCast} from '^types/utils/class-transformer';
import {IntegrationGoogleWorkspaceWorkspaceDto} from '^models/integration/IntegrationGoogleWorkspaceWorkspace/type';
import {IntegrationGoogleWorkspaceMemberDto} from '^models/integration/IntegrationGoogleWorkspaceMember/type/IntegrationGoogleWorkspaceMember.dto';
import {SubscriptionDto} from '^models/Subscription/types';
import {GoogleAdminDirectoryUserTokenDto} from './GoogleAdminDirectoryUserToken.dto';
import {ProductSimilarNameDto} from '^models/ProductSimilarName/type';

export class GoogleWorkspaceOauthTokenActivityDto {
    id: number;

    // 구글 워크스페이스 ID
    workspaceId: number;

    // 구글 워크스페이스 멤버 ID
    workspaceMemberId: number;

    // 구독 ID
    subscriptionId: number | null;

    originalAppName: string; // 오리지널 앱 이름

    // 발견된 앱 이름 ID
    productSimilarNameId: number;

    @TypeCast(() => Date) createdAt: Date;
    @TypeCast(() => Date) updatedAt: Date;

    @TypeCast(() => IntegrationGoogleWorkspaceWorkspaceDto) workspace: IntegrationGoogleWorkspaceWorkspaceDto; // 구글 워크스페이스
    @TypeCast(() => IntegrationGoogleWorkspaceMemberDto) workspaceMember: IntegrationGoogleWorkspaceMemberDto; // 구글 워크스페이스 멤버
    @TypeCast(() => SubscriptionDto) subscription?: SubscriptionDto; // 구독
    @TypeCast(() => GoogleAdminDirectoryUserTokenDto) response: GoogleAdminDirectoryUserTokenDto; // 토큰 결과 객체
    @TypeCast(() => ProductSimilarNameDto) productSimilarName?: ProductSimilarNameDto; // 발견된 앱 이름
}
