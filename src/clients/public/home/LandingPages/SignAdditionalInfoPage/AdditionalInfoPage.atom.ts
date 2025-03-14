import {atom} from 'recoil';
import {UserAdditionalInfoType} from '^models/User/types';

export const signAdditionalInfoPageDataState = atom<UserAdditionalInfoType>({
    key: 'signAdditionalInfo/signAdditionalInfoPageDataState',
    default: {
        name: '',
        email: '',
        phoneNumber: '',
        job: '',
        code: '',
    },
});
