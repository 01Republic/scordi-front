import {FindAllQueryDto} from '^types/utils/findAll.query.dto';
import {TeamCreditCardDto} from '^models/TeamCreditCard/type/TeamCreditCard.dto';

export class FindAllTeamCreditCardQueryDto extends FindAllQueryDto<TeamCreditCardDto> {
    keyword?: string;
}
