import {atom} from 'recoil';
import {ApplicationPrototypeDto} from '^types/applicationPrototype.type';

export const connectPrototypeModalState = atom({
    key: 'connectPrototypeModalState',
    default: false,
});

export const currentPrototypeState = atom<ApplicationPrototypeDto | null>({
    key: 'currentPrototypeState',
    default: null,
});
