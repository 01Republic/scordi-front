import {atom} from 'recoil';
import {CreateScordiPaymentMethodRequestDto} from '^models/_scordi/ScordiPaymentMethod/type';

export const createPaymentMethodQueryAtom = atom<CreateScordiPaymentMethodRequestDto | null>({
    key: 'createPaymentMethodQueryAtom',
    default: null,
});
