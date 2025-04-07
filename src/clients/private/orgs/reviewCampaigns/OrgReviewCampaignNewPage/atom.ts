import {atom, useRecoilState, useResetRecoilState} from 'recoil';
import {CreateReviewCampaignRequestDto} from '^models/ReviewCampaign/type/CreateReviewCampaignRequest.dto';

type ReviewCampaignCreateStep = {
    step: number;
    hidden: boolean;
    folded: boolean;
    isFocused: boolean;
};

const formStepsState: ReviewCampaignCreateStep[] = [
    {step: 1, hidden: false, folded: false, isFocused: true},
    {step: 2, hidden: true, folded: false, isFocused: false},
    {step: 3, hidden: true, folded: false, isFocused: false},
];

export const reviewCampaignCreateStepAtom = atom<ReviewCampaignCreateStep[]>({
    key: 'reviewCampaignCreateStepAtom',
    default: formStepsState,
});

export const useReviewCampaignCreateStep = () => {
    const [steps, setSteps] = useRecoilState(reviewCampaignCreateStepAtom);
    const resetSteps = useResetRecoilState(reviewCampaignCreateStepAtom);

    const focusedStep = steps.find((s) => s.isFocused);
    const getStep = (stepNum: number) => steps.find((s) => s.step === stepNum);

    const setFoldStep = (stepNum: number, fold: boolean) => {
        setSteps((list) => {
            return list.map((stepItem) => {
                const {...item} = stepItem;
                if (item.step === stepNum) item.folded = fold;
                return item;
            });
        });
    };

    const changeStep = (stepNum: number) => {
        setSteps((list) => {
            return list.map((stepItem) => {
                const {...item} = stepItem;
                if (item.step === stepNum) {
                    item.hidden = false;
                    item.folded = false;
                    item.isFocused = true;
                } else {
                    item.isFocused = false;
                }
                return item;
            });
        });
    };

    return {steps, getStep, focusedStep, changeStep, setFoldStep, resetSteps};
};

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
