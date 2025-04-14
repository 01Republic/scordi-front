import {UseFormReturn} from 'react-hook-form';
import {Input} from '^public/components/ui/input';
import {Textarea} from '^public/components/ui/textarea';
import {CreateReviewCampaignRequestDto} from '^models/ReviewCampaign/type';
import {useReviewCampaignCreateStep} from '../atom';
import {InputLabel, StepCard, StepCardBody, StepSubmitButton} from '../components';

export const RequestAddStep1 = ({form}: {form: UseFormReturn<CreateReviewCampaignRequestDto, any>}) => {
    const {getStep, setFoldStep, changeStep} = useReviewCampaignCreateStep();
    const step = getStep(1);
    const title = form.watch('title');
    const description = form.watch('description');

    const validTitle = () => {
        const value = `${title || ''}`.trim();
        if (value.length === 0) return false; // required
        if (value.length > 30) return false; // maxLength
        return true;
    };

    const validDescription = () => {
        const value = `${description || ''}`.trim();
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
                        className={`bg-white`}
                        {...form.register('title')}
                    />
                </div>

                <div className="grid w-full items-center gap-2">
                    <InputLabel required>요청 내용</InputLabel>
                    <Textarea
                        id="description"
                        placeholder={`최대 200자 입력`}
                        rows={8}
                        {...form.register('description')}
                    />
                </div>

                <div className={'flex justify-center space-x-4'}>
                    <StepSubmitButton
                        type="button"
                        onClick={() => {
                            setFoldStep(1, true);
                            changeStep(2);
                        }}
                        disabled={!validTitle() || !validDescription()}
                    />
                </div>
            </StepCardBody>
        </StepCard>
    );
};
