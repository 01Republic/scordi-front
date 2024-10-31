import {UserDto} from '^models/User/types';
import {OrganizationDto} from '^models/Organization/type';
import {FindAllQueryDto} from '^types/utils/findAll.query.dto';
import {TypeCast} from '^types/utils/class-transformer';
import {UserLocale} from '^models/User/types/UserLocale.enum';
import {TeamMemberDto} from '^models/TeamMember';

export enum MembershipLevel {
    MEMBER = 'MEMBER',
    OWNER = 'OWNER',
    ADMIN = 'ADMIN',
}

export enum ApprovalStatus {
    PENDING = 'PENDING', // 승인 요청 됨 & 승인 대기중
    APPROVED = 'APPROVED', // 승인됨.
    REJECTED = 'REJECTED', // 반려됨.
}

export type CreateMembershipRequestDto = {
    organizationId: number;
    userId: number;
    level?: MembershipLevel;
};

export type UpdateMembershipRequestDto = Partial<Omit<CreateMembershipRequestDto, 'organizationId' | 'userId'>> & {
    approvalStatus?: ApprovalStatus; // 멤버십 승인 요청 상태 (가입 승인 요청 상태)
    displayCurrency?: DisplayCurrency; // 조직 화폐 사용자보기
};

// My Membership UpdateDto
export class UpdateMyMembershipRequestDto {
    displayCurrency?: DisplayCurrency; // 조직 화폐 사용자보기
    lastSignedAt?: Date; // 최근 로그인 시간
}

// 조직 화폐 사용자보기
export enum DisplayCurrency {
    USD = 'USD',
    KRW = 'KRW',
}

export class MembershipDto {
    id: number;
    organizationId: number;
    userId: number;
    level: MembershipLevel;
    approvalStatus: ApprovalStatus; // 멤버십 승인 요청 상태 (가입 승인 요청 상태)
    displayCurrency: DisplayCurrency; // 조직 화폐 사용자보기
    invitedEmail: string | null;
    @TypeCast(() => Date) createdAt: Date;
    @TypeCast(() => Date) updatedAt: Date;
    @TypeCast(() => Date) lastSignedAt: Date;

    // relations
    @TypeCast(() => OrganizationDto) organization: OrganizationDto;
    @TypeCast(() => UserDto) user: UserDto;
    @TypeCast(() => TeamMemberDto) teamMember?: TeamMemberDto;
}

export class FindAllMembershipQuery extends FindAllQueryDto<MembershipDto> {
    keyword?: string;
    includeAdmin?: boolean; // 결과에 어드민 멤버십을 포함할지 여부
}

export type Invitation = {
    email: string;
    teamMemberId?: number;
};

export type CreateMembershipInviteDto = {
    organizationId: number;
    invitations: Invitation[];
};

interface MembershipLevelTranslateOption {
    inWord?: boolean;
    locale?: UserLocale;
}

export function t_membershipLevel(level: MembershipLevel, opt?: MembershipLevelTranslateOption) {
    const {inWord = true, locale = UserLocale.Ko} = opt || {};

    const dic = {
        [UserLocale.Ko]: {
            [MembershipLevel.MEMBER]: inWord ? '멤버' : '이 워크스페이스의 멤버',
            [MembershipLevel.OWNER]: inWord ? '소유자' : '이 워크스페이스의 소유자',
            [MembershipLevel.ADMIN]: inWord ? '최고 관리자' : '최고 관리자',
        },
        [UserLocale.En]: {
            [MembershipLevel.MEMBER]: inWord ? 'member' : 'workspace member',
            [MembershipLevel.OWNER]: inWord ? 'owner' : 'workspace owner',
            [MembershipLevel.ADMIN]: inWord ? 'admin' : 'administration',
        },
    };

    return dic[locale][level];
}
