import {atom} from 'recoil';
import {CodefAccountDto} from '^models/CodefAccount/type/CodefAccountDto';

export const currentCodefAccountAtom = atom<CodefAccountDto | null>({
    key: 'currentCodefAccountAtom',
    default: null,
});
