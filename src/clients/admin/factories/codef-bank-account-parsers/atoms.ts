import {atom} from 'recoil';
import {CodefBankAccountParserDto} from '^models/_codef/CodefBankAccountParser/type';

export const codefBankAccountParserAtom = atom<CodefBankAccountParserDto | null>({
    key: 'codefBankAccountParserAtom',
    default: null,
});
