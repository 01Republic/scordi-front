import {atom} from 'recoil';

export enum ViewAbout {
    members,
    connects,
}

export const viewAboutAtom = atom({key: 'ViewAboutAtom', default: ViewAbout.members});
