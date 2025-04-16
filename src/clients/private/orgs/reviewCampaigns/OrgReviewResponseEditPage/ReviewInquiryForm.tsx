import {UseFormReturn} from 'react-hook-form';
import {Textarea} from '^public/components/ui/textarea';
import {UpdateReviewResponseRequestDto} from '^models/ReviewResponse/type';
import {CardSection} from './CardSection';

interface ReviewInquiryFormProps {
    form: UseFormReturn<UpdateReviewResponseRequestDto, any>;
    readonly?: boolean;
}

export const ReviewInquiryForm = ({form, readonly = false}: ReviewInquiryFormProps) => (
    <CardSection title="추가적으로 문의사항이 있다면 남겨주세요.">
        <div>
            {!readonly ? (
                <Textarea placeholder="주관식 답변" className="bg-white min-h-40" {...form.register('inquiry')} />
            ) : (
                <div className="border border-input rounded-md whitespace-pre-wrap min-h-40 text-14 bg-gray-100 px-3 py-2">
                    {form.getValues('inquiry') || <i className="text-gray-400 font-medium">입력한 내용 없음</i>}
                </div>
            )}
        </div>
    </CardSection>
);
