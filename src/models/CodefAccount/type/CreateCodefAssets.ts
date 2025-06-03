import {AccountCreatedResponseDto} from '^models/CodefAccount/type/create-account.response.dto';
import {BankAccountsStaticData} from '^models/CodefAccount/bank-account-static-data';
import {CardAccountsStaticData} from '^models/CodefAccount/card-accounts-static-data';
import {CodefAccountDto} from '^models/CodefAccount/type/CodefAccountDto';

export interface CreateCodefBankAssets {
    successes: {item: BankAccountsStaticData; response: CodefAccountDto}[];
    failures: {item: BankAccountsStaticData; reason: any}[];
}

export interface CreateCodefCardAssets {
    successes: {item: CardAccountsStaticData; response: CodefAccountDto}[];
    failures: {item: CardAccountsStaticData; reason: any}[];
}
