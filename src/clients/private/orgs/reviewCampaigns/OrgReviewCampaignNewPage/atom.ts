import {atom} from 'recoil';

export const reviewCampaignCreateStepAtom = atom<number>({
    key: 'reviewCampaignCreateStepAtom',
    default: 1,
});
