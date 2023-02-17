import {UserDto} from '^types/user.type';
import {OrganizationDto} from '^types/organization.type';
import {FindAllQueryDto} from '^types/utils/findAll.query.dto';

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

export type UpdateMembershipRequestDto = Partial<CreateMembershipRequestDto> & {
    approvalStatus?: ApprovalStatus;
};

export type MembershipDto = {
    id: number;
    organizationId: number;
    userId: number;
    level: MembershipLevel;
    approvalStatus: ApprovalStatus; // 멤버십 승인 요청 상태 (가입 승인 요청 상태)
    createdAt: Date;
    updatedAt: Date;
    organization: OrganizationDto;
    user: UserDto;
};

export type FindAllMembershipQuery = FindAllQueryDto<MembershipDto>;
