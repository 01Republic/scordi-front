import {UpdateReviewResponseRequestDto} from '^models/ReviewResponse/type';
import {Textarea} from '^public/components/ui/textarea';
import {useTranslation} from 'next-i18next';
import {UseFormReturn} from 'react-hook-form';
import {CardSection} from './CardSection';

interface ReviewInquiryFormProps {
    form: UseFormReturn<UpdateReviewResponseRequestDto, any>;
    readonly?: boolean;
}

export const ReviewInquiryForm = ({form, readonly = false}: ReviewInquiryFormProps) => {
    const {t} = useTranslation('reviewCampaigns');

    return (
        <CardSection title={t('response.inquiry.title')}>
            <div>
                {!readonly ? (
                    <Textarea
                        placeholder={t('response.inquiry.placeholder') as string}
                        className="bg-white min-h-40"
                        {...form.register('inquiry')}
                    />
                ) : (
                    <div className="border border-input rounded-md whitespace-pre-wrap min-h-40 text-14 bg-gray-100 px-3 py-2">
                        {form.getValues('inquiry') || (
                            <i className="text-gray-400 font-medium">{t('response.inquiry.noContent')}</i>
                        )}
                    </div>
                )}
            </div>
        </CardSection>
    );
};
