import {PartialType} from '^types/utils/partial-type';
import {CreateBankAccountRequestDto} from './create.bank-account.request.dto';

export class UpdateBankAccountRequestDto extends PartialType(CreateBankAccountRequestDto) {
    //
}
