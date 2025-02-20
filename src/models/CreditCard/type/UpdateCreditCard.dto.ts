import {PartialType} from '^types/utils/partial-type';
import {CreateCreditCardDto} from './CreateCreditCard.dto';

export class UpdateCreditCardDto extends PartialType(CreateCreditCardDto) {
    bankAccountId?: number | null;
}
