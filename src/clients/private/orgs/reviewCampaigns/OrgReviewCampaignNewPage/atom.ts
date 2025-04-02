import {atom} from 'recoil';

export const requestAddStepAtom = atom<number>({
    key: 'requestAddStep',
    default: 1,
});
