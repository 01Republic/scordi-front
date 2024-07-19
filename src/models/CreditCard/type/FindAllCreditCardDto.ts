import {FindAllQueryDto} from '^types/utils/findAll.query.dto';
import {CreditCardDto} from './CreditCard.dto';

export type FindAllCreditCardDto = FindAllQueryDto<CreditCardDto> & {
    keyword?: string;
};
