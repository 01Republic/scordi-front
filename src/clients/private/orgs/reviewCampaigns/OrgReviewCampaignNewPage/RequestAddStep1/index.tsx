import {useRecoilState} from 'recoil';
import {Input} from '^public/components/ui/input';
import {Textarea} from '^public/components/ui/textarea';
import {createReviewCampaignRequestAtom, useReviewCampaignCreateStep} from '../atom';
import {InputLabel, StepCard, StepCardBody, StepSubmitButton} from '../components';

export const RequestAddStep1 = () => {
    const {getStep, setFoldStep, changeStep} = useReviewCampaignCreateStep();
    const [formData, setFormData] = useRecoilState(createReviewCampaignRequestAtom);
    const step = getStep(1);

    const validTitle = (val: string) => {
        const value = `${val || ''}`.trim();
        if (value.length === 0) return false; // required
        if (value.length > 30) return false; // maxLength
        return true;
    };

    const validDescription = (val: string) => {
        const value = `${val || ''}`.trim();
        if (value.length === 0) return false; // required
        if (value.length > 200) return false; // maxLength
        return true;
    };

    return (
        <StepCard
            title="1. 제목과 내용 작성"
            isHidden={!!step?.hidden}
            isCurrent={!!step?.isFocused}
            isFolded={!!step?.folded}
            setIsFolded={(isFolded) => setFoldStep(1, isFolded)}
        >
            <StepCardBody>
                <div className="flex flex-col gap-2">
                    <InputLabel required>요청 제목</InputLabel>
                    <Input
                        type="text"
                        id="title"
                        placeholder="제목을 입력해주세요."
                        className="bg-white"
                        defaultValue={formData.title}
                        onChange={(e) => {
                            const title = e.target.value;
                            setFormData((prev) => ({...prev, title}));
                        }}
                    />
                </div>

                <div className="grid w-full items-center gap-2">
                    <InputLabel required>요청 내용</InputLabel>
                    <Textarea
                        id="description"
                        placeholder="최대 200자 입력"
                        rows={8}
                        defaultValue={formData.description}
                        onChange={(e) => {
                            const description = e.target.value;
                            setFormData((prev) => ({...prev, description}));
                        }}
                    />
                </div>

                <div className={'flex justify-center space-x-4'}>
                    <StepSubmitButton
                        onClick={() => {
                            setFoldStep(1, true);
                            changeStep(2);
                        }}
                        disabled={!validTitle(formData.title) || !validDescription(formData.description)}
                    />
                </div>
            </StepCardBody>
        </StepCard>
    );
};
