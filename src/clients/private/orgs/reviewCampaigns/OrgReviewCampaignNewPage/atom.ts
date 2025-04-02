import {atom} from 'recoil';
import {CreateReviewCampaignRequestDto} from '^models/ReviewCampaign/type/CreateReviewCampaignRequest.dto';

export const reviewCampaignCreateStepAtom = atom<number>({
    key: 'reviewCampaignCreateStepAtom',
    default: 1,
});

export const defaultCreateReviewCampaignRequestDto = {
    title: '',
    description: '',
    finishAt: new Date(),
    teamMemberIds: [],
};

export const createReviewCampaignRequestAtom = atom<CreateReviewCampaignRequestDto>({
    key: 'createReviewCampaignRequestAtom',
    default: defaultCreateReviewCampaignRequestDto,
});
