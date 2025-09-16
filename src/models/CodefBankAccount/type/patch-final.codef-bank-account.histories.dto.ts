import {FindAllBankAccountHistoryQueryDto} from './find-all.bank-account-history.query.dto';

export class PatchFinalCodefBankAccountHistoriesDto extends FindAllBankAccountHistoryQueryDto {
    completeCodefBankAccountIds?: number[];
    patchCodefBankAccountIds?: number[];
}
