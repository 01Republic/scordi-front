import {OrganizationDto} from '^models/Organization/type';
import {TeamDto} from '^models/Team/type';
import {FindAllQueryDto} from '^types/utils/findAll.query.dto';
import {TypeCast} from '^types/utils/class-transformer';
import {MembershipDto} from 'src/models/Membership/types';
import {SubscriptionDto} from '^models/Subscription/types';
import {CreditCardDto} from '^models/CreditCard/type';
import {PartialType} from '^types/utils/partial-type';

export * from './TeamMemberSubscription.dto';

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
            profileImgUrl: this.profileImgUrl ?? this.user?.profileImgUrl,
            profileImgPlaceholder: `https://placehold.co/200x200@3x.png?font=open-sans&text=${
                this.email ? this.email[0].toUpperCase() : '?'
            }`,
        };
    }

    // 임시
    get team() {
        const teams = this.teams || [];
        const team = teams[0];
        return team ? team : undefined;
    }
}

export type FindAllTeamMemberQueryDto = FindAllQueryDto<TeamMemberDto> & {
    teamId?: number | null; // 검색할 소속팀 ID
    name?: string | null; // 검색할 이름
    keyword?: string | null;
};

export class CreateTeamMemberDto {
    name: string; // 멤버 이름
    email?: string; // 이메일
    phone?: string; // 전화번호
    jobName?: string; // 직무 이름
    jobDescription?: string; // 직무 설명
    notes?: string; // 메모, 비고
    profileImgUrl?: string | null; // 프로필 이미지 주소
    userId?: number | null; // 스코디 회원 아이디
    teamIds?: number[]; // 소속팀 아이디
}

export class UpdateTeamMemberDto extends PartialType(CreateTeamMemberDto) {
    subscriptionIds?: number[]; // 이용 중인 서비스
}
