import {OrganizationDto} from '^models/Organization/type';
import {SubscriptionDto} from 'src/models/Subscription/types';
import {TagDto} from '^models/Tag/type';
import {TeamMemberDto} from '^models/TeamMember/type';
import {FindAllQueryDto} from '^types/utils/findAll.query.dto';
import {TypeCast} from '^types/utils/class-transformer';
import {TeamCreditCardDto} from '^models/TeamCreditCard/type/TeamCreditCard.dto';
import {CreditCardDto} from '^models/CreditCard/type';

export class TeamDto {
    id: number;
    name: string;
    organizationId: number;

    @TypeCast(() => OrganizationDto) organization: OrganizationDto;
    @TypeCast(() => TeamMemberDto) members: TeamMemberDto[];
    @TypeCast(() => SubscriptionDto) subscriptions: SubscriptionDto[];

    // @TypeCast(() => TeamCreditCardDto) teamCreditCards?: TeamCreditCardDto[]; // 카드를 사용하고 있는 팀 목록
    @TypeCast(() => CreditCardDto) creditCards?: CreditCardDto[]; // 카드를 사용하고 있는 팀 목록

    // @TypeCast(() => TagDto)
    tags: TagDto[];
}

export class CreateTeamDto {
    name: string;
}

export class UpdateTeamDto {
    name?: string | null;
}

export class FindAllTeamQueryDto extends FindAllQueryDto<TeamDto> {
    keyword?: string; // 키워드
}
