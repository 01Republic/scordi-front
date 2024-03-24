import {atom} from 'recoil';

export const newCodefCardConnected = atom<Record<number, boolean>>({
    key: 'newCodefCardConnected',
    default: {},
});
