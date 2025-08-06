import {CreateReviewCampaignRequestDto} from '^models/ReviewCampaign/type';
import {Input} from '^public/components/ui/input';
import {Textarea} from '^public/components/ui/textarea';
import {useTranslation} from 'next-i18next';
import {UseFormReturn} from 'react-hook-form';
import {useReviewCampaignCreateStep} from '../atom';
import {InputLabel, StepCard, StepCardBody, StepSubmitButton} from '../components';

export const RequestAddStep1 = ({form}: {form: UseFormReturn<CreateReviewCampaignRequestDto, any>}) => {
    const {getStep, setFoldStep, changeStep} = useReviewCampaignCreateStep();
    const {t} = useTranslation('reviewCampaigns');
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
            title={t('step1.title')}
            isHidden={!!step?.hidden}
            isCurrent={!!step?.isFocused}
            isFolded={!!step?.folded}
            setIsFolded={(isFolded) => setFoldStep(1, isFolded)}
        >
            <StepCardBody>
                <div className="flex flex-col gap-2">
                    <InputLabel required>{t('step1.requestTitle')}</InputLabel>
                    <Input
                        type="text"
                        id="title"
                        placeholder={t('step1.titlePlaceholder') as string}
                        className={`bg-white ${errors.title?.message ? '!ring-1 !ring-error' : ''}`}
                        {...form.register('title', {
                            required: {value: true, message: t('step1.requiredMessage')},
                            maxLength: {value: 30, message: t('step1.maxLengthMessage', {length: 30})},
                        })}
                    />
                    <p className="text-error text-12">{errors.title?.message}&nbsp;</p>
                </div>

                <div className="flex flex-col gap-2">
                    <InputLabel required>{t('step1.requestContent')}</InputLabel>
                    <Textarea
                        id="description"
                        placeholder={t('step1.contentPlaceholder') as string}
                        rows={8}
                        className={`bg-white ${errors.description?.message ? '!ring-1 !ring-error' : ''}`}
                        {...form.register('description', {
                            required: {value: true, message: t('step1.requiredMessage')},
                            maxLength: {value: 200, message: t('step1.maxLengthMessage', {length: 200})},
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
