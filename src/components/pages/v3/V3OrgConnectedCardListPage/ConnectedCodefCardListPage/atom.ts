import {atom} from 'recoil';
import {CodefCardDto} from '^models/CodefCard/type/CodefCard.dto';

export const codefCardConnected = atom({
    key: 'codefCardConnected',
    default: false,
});

export const selectedCodefCardAtom = atom<CodefCardDto | null>({
    key: 'selectedCodefCardAtom',
    default: null,
});
