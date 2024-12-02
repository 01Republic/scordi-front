import {UserDto} from '^models/User/types';
import {OrganizationDto} from '^models/Organization/type';
import {FindAllQueryDto} from '^types/utils/findAll.query.dto';
import {TypeCast} from '^types/utils/class-transformer';
import {UserLocale} from '^models/User/types/UserLocale.enum';
import {TeamMemberDto} from '^models/TeamMember';
import {PartialType} from '^types/utils/partial-type';

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

export class CreateMembershipRequestDto {
    organizationId: number;
    userId: number;
    level?: MembershipLevel;
}

export class UpdateMembershipRequestDto extends PartialType(CreateMembershipRequestDto) {
    approvalStatus?: ApprovalStatus; // 멤버십 승인 요청 상태 (가입 승인 요청 상태)
    displayCurrency?: DisplayCurrency; // 조직 화폐 사용자보기
}

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
    userId: number | null;
    level: MembershipLevel;
    approvalStatus: ApprovalStatus; // 멤버십 승인 요청 상태 (가입 승인 요청 상태)
    displayCurrency: DisplayCurrency; // 조직 화폐 사용자보기
    invitedEmail: string | null; // 초대 받은 이메일 주소
    @TypeCast(() => Date) inviteSentAt: Date | null; // 초대된 일시
    @TypeCast(() => Date) inviteConfirmedAt: Date | null; // 초대 수락된 일시
    @TypeCast(() => Date) lastSignedAt: Date; // 최근 로그인 일시
    @TypeCast(() => Date) createdAt: Date;
    @TypeCast(() => Date) updatedAt: Date;

    // relations
    @TypeCast(() => OrganizationDto) organization: OrganizationDto;
    @TypeCast(() => UserDto) user?: UserDto;
    @TypeCast(() => TeamMemberDto) teamMember?: TeamMemberDto;
}

export class FindAllMembershipQuery extends FindAllQueryDto<MembershipDto> {
    keyword?: string;
    includeAdmin?: boolean; // 결과에 어드민 멤버십을 포함할지 여부
}

interface MembershipLevelTranslateOption {
    inWord?: boolean;
    locale?: UserLocale;
}

export function t_membershipLevel(level: MembershipLevel, opt?: MembershipLevelTranslateOption) {
    const {inWord = true, locale = UserLocale.Ko} = opt || {};

    const dic = {
        [UserLocale.Ko]: {
            [MembershipLevel.MEMBER]: inWord ? '구성원' : '이 워크스페이스의 구성원',
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

export * from './CreateMembershipInvite.dto';
