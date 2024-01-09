import {UserDto} from '^models/User/types';
import {OrganizationDto} from '^models/Organization/type';
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

export function t_ApprovalStatus(status: ApprovalStatus) {
    switch (status) {
        case ApprovalStatus.APPROVED:
            return '초대 완료';
        case ApprovalStatus.PENDING:
            return '초대중';
        case ApprovalStatus.REJECTED:
            return '초대 실패';
    }
}

export function c_ApprovalStatus(status: ApprovalStatus) {
    switch (status) {
        case ApprovalStatus.APPROVED:
            return 'btn-success';
        case ApprovalStatus.PENDING:
            return 'btn-scordi';
        case ApprovalStatus.REJECTED:
            return 'btn-error';
    }
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

export type Invitation = {
    email: string;
    teamMemberId?: number;
};

export type CreateMembershipInviteDto = {
    organizationId: number;
    invitations: Invitation[];
};
