import {OrganizationDto} from '^models/Organization/type';
import {TagDto} from '^models/Tag/type';
import {TeamMemberDto} from '^models/TeamMember/type';
import {FindAllQueryDto} from '^types/utils/findAll.query.dto';
import {TypeCast} from '^types/utils/class-transformer';
import {CreditCardDto} from '^models/CreditCard/type';
import {InvoiceAccountDto} from '^models/InvoiceAccount/type';
import {PartialType} from '^types/utils/partial-type';

export class TeamDto {
    id: number;
    name: string;
    organizationId: number;

    readonly teamMemberCount: number; // 연결된 팀멤버 수
    readonly subscriptionCount: number; // 팀멤버로부터 연결된 구독 수
    readonly creditCardCount: number; // 연결된 카드 수
    readonly invoiceAccountCount: number; // 연결된 인보이스 계정 수

    @TypeCast(() => OrganizationDto) organization?: OrganizationDto;
    @TypeCast(() => TeamMemberDto) members?: TeamMemberDto[];
    @TypeCast(() => CreditCardDto) creditCards?: CreditCardDto[];
    @TypeCast(() => InvoiceAccountDto) invoiceAccounts?: InvoiceAccountDto[];

    // @TypeCast(() => TagDto)
    tags: TagDto[];
}

export class CreateTeamDto {
    name: string;
}

export class UpdateTeamDto extends PartialType(CreateTeamDto) {
    // name?: string | null;
}

export class FindAllTeamQueryDto extends FindAllQueryDto<TeamDto> {
    keyword?: string; // 키워드
}

export class RangeQueryDto {
    startDate?: Date; // 조회시작일 (yyyy-mm-dd)
    endDate?: Date; // 조회종료일 (yyyy-mm-dd)
}
