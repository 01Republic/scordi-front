import {atom} from 'recoil';
import {CreateMembershipInviteDto} from '^models/Membership/types';

export const isOpenInviteOrgMemberModalAtom = atom({
    key: 'isOpenInviteOrgMemberModalAtom',
    default: false,
});

export const isOpenLoadingModalAtom = atom({
    key: 'isOpenLoadingModalAtom',
    default: false,
});

export const createInviteTeamMemberAtom = atom<CreateMembershipInviteDto>({
    key: 'createInviteTeamMemberAtom',
    default: {} as CreateMembershipInviteDto,
});

export const emailInputValueAtom = atom<string>({
    key: 'emailInputValueAtom',
    default: '',
});

export const isLoadingAtom = atom<boolean>({
    key: 'isLoadingAtom',
    default: false,
});
