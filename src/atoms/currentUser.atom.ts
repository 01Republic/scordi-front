import {atom} from 'recoil';
import {UserDto} from '^types/user.type';

export const currentUserAtom = atom({
    key: 'currentUser',
    default: {} as UserDto,
});
