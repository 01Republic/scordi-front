import {OrganizationDto} from '^models/Organization/type';
import {TypeCast} from '^types/utils/class-transformer';
import {CodefCardDto} from '^models/CodefCard/type/CodefCard.dto';
import {CodefBankAccountDto} from '^models/CodefBankAccount/type/CodefBankAccount.dto';

export class CodefBankAccountSearchResultDto {
    @TypeCast(() => OrganizationDto)
    organization: OrganizationDto;

    @TypeCast(() => OrganizationDto)
    organizations: OrganizationDto[];

    @TypeCast(() => CodefBankAccountDto)
    codefBankAccounts: CodefBankAccountDto[];
}
