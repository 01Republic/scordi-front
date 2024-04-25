import {OrganizationDto} from '^models/Organization/type';
import {TypeCast} from '^types/utils/class-transformer';
import {CodefCardDto} from '^models/CodefCard/type/CodefCard.dto';

export class CodefCardSearchResultDto {
    @TypeCast(() => OrganizationDto)
    organization: OrganizationDto;

    @TypeCast(() => OrganizationDto)
    organizations: OrganizationDto[];

    @TypeCast(() => CodefCardDto)
    codefCards: CodefCardDto[];
}
