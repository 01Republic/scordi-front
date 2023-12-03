import {OrganizationDto} from '^models/Organization/type';
import {TeamDto} from '^models/Team/type';
import {FindAllQueryDto} from '^types/utils/findAll.query.dto';
import {TypeCast} from '^types/utils/class-transformer';
import {MembershipDto} from 'src/models/Membership/types';
import {SubscriptionDto} from '^models/Subscription/types';
import {CreditCardDto} from '^models/CreditCard/type';
import {approvalStatusOptions} from '^models/Membership/types/approvalStatusOptions';

export class TeamMemberDto {
    id: number; // 아이디
    name: string; // 이름
    email?: string | null; // 이메일
    phone?: string | null; // 전화번호
    jobName?: string | null; // 직무 이름
    jobDescription?: string | null; // 직무 설명
    notes?: string | null; // 메모, 비고
    profileImgUrl?: string | null; // 프로필 이미지 주소
    organizationId: number; // 스코디 조직 ID
    membershipId?: number | null; // 스코디 멤버십 ID
    @TypeCast(() => Date) createdAt: Date; // 생성일시
    @TypeCast(() => Date) updatedAt: Date; // 수정일시

    @TypeCast(() => OrganizationDto) organization: OrganizationDto; // 스코디 조직
    @TypeCast(() => MembershipDto) membership?: MembershipDto; // 멤버십 상세
    // @TypeCast(() => UserDto) user?: UserDto; // 스코디 유저
    @TypeCast(() => TeamDto) teams?: TeamDto[]; // 팀
    @TypeCast(() => SubscriptionDto) subscriptions?: SubscriptionDto[]; // 사용하는 구독
    @TypeCast(() => CreditCardDto) creditCards?: CreditCardDto[]; // 보유 중인 카드

    get user() {
        return this.membership?.user;
    }

    get profileImageUrl() {
        return this.profileImgUrl || `https://placehold.co/200x200?text=${this.name[0]}`;
    }

    makeTeamMemberProfile() {
        return {
            name: this.name,
            email: this.email ?? this.user?.email ?? '',
            phone: this.phone ?? this.user?.phone ?? '',
            jobName: this.jobName,
            jobDescription: this.jobDescription,
            profileImgUrl:
                this.profileImgUrl ??
                this.user?.profileImgUrl ??
                `https://placehold.co/200x200?text=${encodeURIComponent(this.name)}`,
        };
    }

    getApprovalStatusOption() {
        return approvalStatusOptions.find((option) => {
            return option.status === this.membership?.approvalStatus;
        });
    }
}

export type FindAllTeamMemberQueryDto = FindAllQueryDto<TeamMemberDto> & {
    teamId?: number | null;
    name?: string | null;
};

export type CreateTeamMemberDto = {
    name: string;
    email?: string | null;
    phone?: string | null;
    jobName?: string | null;
    jobDescription?: string | null;
    notes?: string | null;
    profileImgUrl?: string | null;
    userId?: number | null;
};

export type UpdateTeamMemberDto = {
    name?: string;
    email?: string | null;
    phone?: string | null;
    jobName?: string | null;
    jobDescription?: string | null;
    notes?: string | null;
    profileImgUrl?: string | null;
};