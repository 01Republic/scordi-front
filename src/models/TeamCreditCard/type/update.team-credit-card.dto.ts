import {PartialType} from '^types/utils/partial-type';
import {CreateTeamCreditCardDto} from './create.team-credit-card.dto';

export class UpdateTeamCreditCardDto extends PartialType(CreateTeamCreditCardDto) {}
