import {atom} from 'recoil';
import {CreateSubscriptionRequestDto} from '^models/Subscription/types';

export const newSubscriptionManualFormData = atom({
    key: 'newSubscriptionManualFormData',
    default: new CreateSubscriptionRequestDto(),
});

export const newSubscriptionModalManually = {
    isShowAtom: atom({
        key: 'v3/newSubscriptionModal/Manually/isShow',
        default: false,
    }),
    popStateSyncKey: 'v3/newSubscriptionModal/Manually',
};

export const newFormForGeneralInfoModalAtom = {
    isShowAtom: atom({
        key: 'v3/newSubscriptionModal/Manually/FormForGeneralInfoModal/isShow',
        default: false,
    }),
    popStateSyncKey: 'v3/newSubscriptionModal/FormForGeneralInfoModal/Manually',
};

export const newFormForBillingInfoModalAtom = {
    isShowAtom: atom({
        key: 'v3/newSubscriptionModal/Manually/FormForBillingInfoModal/isShow',
        default: false,
    }),
    popStateSyncKey: 'v3/newSubscriptionModal/FormForBillingInfoModal/Manually',
};

export const newFormForUsingMemberInfoModalAtom = {
    isShowAtom: atom({
        key: 'v3/newSubscriptionModal/Manually/FormForUsingMemberInfoModal/isShow',
        default: false,
    }),
    popStateSyncKey: 'v3/newSubscriptionModal/FormForUsingMemberInfoModal/Manually',
};

export const newFormForFinishModalAtom = {
    isShowAtom: atom({
        key: 'v3/newSubscriptionModal/Manually/newFormForFinishModalAtom/isShow',
        default: false,
    }),
    popStateSyncKey: 'v3/newSubscriptionModal/newFormForFinishModalAtom/Manually',
};

export const memoAtom = atom<string>({
    key: 'memoAtom',
    default: '',
});

export enum FinishStatus {
    Finish,
    Memo,
}

export const FinishStatusAtom = atom({
    key: 'FinishStatusAtom',
    default: FinishStatus.Finish,
});
