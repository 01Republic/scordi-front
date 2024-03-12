import {atom} from 'recoil';
import {CodefAccountDto} from '^models/CodefAccount/type/CodefAccountDto';
import {CardAccountsStaticData} from '^models/CodefAccount/card-accounts-static-data';

export interface CodefAccountProps {
    codefAccount: CodefAccountDto;
    staticData: CardAccountsStaticData;
}

export const newCodefCardConnected = atom<Record<number, boolean>>({
    key: 'newCodefCardConnected',
    default: {},
});
