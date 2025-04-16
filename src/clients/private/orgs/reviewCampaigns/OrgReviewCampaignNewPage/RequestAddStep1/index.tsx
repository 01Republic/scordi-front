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
    const {errors} = form.formState;

    const validTitle = () => {
        const value = `${title || ''}`.trim();
        // form.trigger('title');
        if (value.length === 0) {
            return false; // required
        }
        if (value.length > 30) {
            return false; // maxLength
        }
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
                        className={`bg-white ${errors.title?.message ? '!ring-1 !ring-error' : ''}`}
                        {...form.register('title', {
                            required: {value: true, message: '필수 입력 사항입니다.'},
                            maxLength: {value: 30, message: '30자 이내로 입력해주세요.'},
                        })}
                    />
                    <p className="text-error text-12">{errors.title?.message}&nbsp;</p>
                </div>

                <div className="flex flex-col gap-2">
                    <InputLabel required>요청 내용</InputLabel>
                    <Textarea
                        id="description"
                        placeholder="내용을 입력해주세요."
                        rows={8}
                        className={`bg-white ${errors.description?.message ? '!ring-1 !ring-error' : ''}`}
                        {...form.register('description', {
                            required: {value: true, message: '필수 입력 사항입니다.'},
                            maxLength: {value: 200, message: '200자 이내로 입력해주세요.'},
                        })}
                    />
                    <p className="text-error text-12">{errors.description?.message}&nbsp;</p>
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
