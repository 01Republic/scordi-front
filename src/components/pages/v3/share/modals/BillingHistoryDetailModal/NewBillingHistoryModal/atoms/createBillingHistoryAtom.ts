import {CreateBillingHistoryRequestDto} from '^models/BillingHistory/type';
import {atom} from 'recoil';

export const createBillingHistoryAtom = atom<CreateBillingHistoryRequestDto>({
    key: 'createBillingHistoryAtom',
    default: {} as CreateBillingHistoryRequestDto,
});
