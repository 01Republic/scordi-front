import {UserDto} from '^models/User/types';
import {MembershipDto} from 'src/models/Membership/types';
import {TypeCast} from '^types/utils/class-transformer';
import {CreditCardDto} from '^models/CreditCard/type';
import {GoogleSyncHistoryDto} from '^models/GoogleSyncHistory/type';
import {InvoiceAccountDto} from '^models/InvoiceAccount/type';
import {zero1_republic_workspace_id} from '^config/environments';

export type CreateOrganizationRequestDto = {
    name: string;
};

export type UpdateOrganizationRequestDto = Partial<CreateOrganizationRequestDto> & {
    slug?: string;
    image?: File | string;
    address?: string;
    addressDetail?: string;
};

export type SearchOrgQueryDto = {
    keyword: string;
};

export class OrganizationDto {
    id: number; // 아이디
    name: string; // 조직명
    slug: string; // Slug
    image?: string; // 프로필 이미지 URL
    address?: string | null; // 주소
    addressDetail?: string | null; // 상세 주소
    memberCount: number; // 조직내 사용자 수
    subscriptionCount?: number; // 조직내 구독 수
    lastGoogleSyncHistoryId: number | null; // 최신 워크스페이스 동기화 내역 ID
    @TypeCast(() => Date) createdAt: Date;
    @TypeCast(() => Date) updatedAt: Date;

    // relations
    @TypeCast(() => MembershipDto) memberships?: MembershipDto[];
    @TypeCast(() => UserDto) users?: UserDto[];
    // roles?: RoleDto[]
    @TypeCast(() => InvoiceAccountDto) invoiceAccounts?: InvoiceAccountDto[];
    @TypeCast(() => CreditCardDto) creditCards?: CreditCardDto[]; // 카드
    @TypeCast(() => GoogleSyncHistoryDto) googleSyncHistories?: GoogleSyncHistoryDto[]; // 구글 동기화 내역
    @TypeCast(() => GoogleSyncHistoryDto) lastGoogleSyncHistory: GoogleSyncHistoryDto | null; // 최신 워크스페이스 동기화 내역

    get isZeroOneTeam() {
        return this.id === zero1_republic_workspace_id;
    }

    isOnboardingFinished() {
        return this.isSyncedWithGoogleWorkspace() && this.isSyncedWithInvoiceAccount();
    }

    isSyncedWithGoogleWorkspace() {
        return !!this.lastGoogleSyncHistoryId;
    }

    isSyncedWithInvoiceAccount() {
        return !!(this.invoiceAccounts || []).length;
    }
}

export class OrganizationConnectStatusDto {
    id: number;
    name: string;
    workspaceSyncHistoriesCount: number;
    invoiceAccountsCount: number;
    isCodefSigned: boolean;
    codefAccountsCount: number;
    codefCardsCount: number;
    creditCardsCount: number;
    subscriptionsCount: number;
    @TypeCast(() => Date) createdAt: Date;
    @TypeCast(() => Date) updatedAt: Date;
}
