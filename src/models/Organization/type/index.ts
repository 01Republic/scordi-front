import {UserDto} from '^models/User/types';
import {MembershipDto} from 'src/models/Membership/types';
import {TypeCast} from '^types/utils/class-transformer';
import {CreditCardDto} from '^models/CreditCard/type';
import {GoogleSyncHistoryDto} from '^models/GoogleSyncHistory/type';
import {InvoiceAccountDto} from '^models/InvoiceAccount/type';
import {zero1_republic_workspace_id} from '^config/environments';
import {FindAllQueryDto} from '^types/utils/findAll.query.dto';
import {ScordiSubscriptionDto} from '^models/_scordi/ScordiSubscription/type';
import {BankAccountDto} from '^models/BankAccount/type';

export class CreateOrganizationRequestDto {
    name: string; // 조직명
    isDemo?: boolean; // 테스트 워크스페이스 유무

    @TypeCast(() => CreateOrganizationBizInfoRequestDto)
    bizInfo?: CreateOrganizationBizInfoRequestDto; // 사업자 정보
}

export class CreateOrganizationBizInfoRequestDto {
    bizNo?: string; // 사업자등록번호
    employeeScale?: string; // 조직규모
}

export type UpdateOrganizationRequestDto = Partial<CreateOrganizationRequestDto> & {
    slug?: string;
    image?: File | string;
    address?: string;
    addressDetail?: string;
    isDemo?: boolean; // 테스트 워크스페이스 유무
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
    isDemo?: boolean;
    @TypeCast(() => Date) createdAt: Date;
    @TypeCast(() => Date) updatedAt: Date;
    @TypeCast(() => Date) onboardingFinishedAt: Date | null; // 온보딩 완료 일시

    // relations
    @TypeCast(() => MembershipDto) memberships?: MembershipDto[];
    @TypeCast(() => UserDto) users?: UserDto[];
    // roles?: RoleDto[]
    @TypeCast(() => InvoiceAccountDto) invoiceAccounts?: InvoiceAccountDto[];
    @TypeCast(() => CreditCardDto) creditCards?: CreditCardDto[]; // 카드
    @TypeCast(() => BankAccountDto) bankAccounts?: BankAccountDto[]; // 계좌
    @TypeCast(() => GoogleSyncHistoryDto) googleSyncHistories?: GoogleSyncHistoryDto[]; // 구글 동기화 내역
    @TypeCast(() => GoogleSyncHistoryDto) lastGoogleSyncHistory: GoogleSyncHistoryDto | null; // 최신 워크스페이스 동기화 내역

    @TypeCast(() => ScordiSubscriptionDto) scordiSubscriptions?: ScordiSubscriptionDto[]; // 스코디 구독 목록
    @TypeCast(() => ScordiSubscriptionDto) currentScordiSubscription: ScordiSubscriptionDto | null; // 현재 적용중인 스코디 구독

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
    isCodefCardsSigned: boolean;
    codefAccountsCardsCount: number;
    codefCardsCount: number;
    creditCardsCount: number;
    isCodefBanksSigned: boolean;
    codefAccountsBanksCount: number;
    codefBankAccountsCount: number;
    bankAccountsCount: number;
    subscriptionsCount: number;
    @TypeCast(() => Date) createdAt: Date;
    @TypeCast(() => Date) updatedAt: Date;
}

export class FindAllOrganizationQueryDto extends FindAllQueryDto<OrganizationDto> {
    keyword?: string;
}
