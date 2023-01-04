import {atom} from 'recoil';
import {ApplicationDto} from '^types/application.type';

export const applicationsAtom = atom({
    key: 'applications',
    default: [] as ApplicationDto[],
});

export const applicationAtom = atom({
    key: 'application',
    default: null as ApplicationDto | null,
});
