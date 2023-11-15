import {UserDto} from '^models/User/types';
import {OrganizationDto} from '^types/organization.type';
import {FindAllQueryDto} from '^types/utils/findAll.query.dto';
import {TypeCast} from '^types/utils/class-transformer';

export enum MembershipLevel {
    MEMBER = 'MEMBER',
    OWNER = 'OWNER',
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

    // relations
    @TypeCast(() => OrganizationDto) organization: OrganizationDto;
    @TypeCast(() => UserDto) user: UserDto;
}

export type FindAllMembershipQuery = FindAllQueryDto<MembershipDto> & {
    keyword?: string;
};

export type CreateMembershipInviteDto = {
    organizationId: number;
    invitedEmails: string[];
};
