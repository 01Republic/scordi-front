import {UseFormReturn} from 'react-hook-form';
import {Textarea} from '^public/components/ui/textarea';
import {UpdateReviewResponseRequestDto} from '^models/ReviewResponse/type';
import {CardSection} from './CardSection';

interface ReviewInquiryFormProps {
    form: UseFormReturn<UpdateReviewResponseRequestDto, any>;
}

export const ReviewInquiryForm = ({form}: ReviewInquiryFormProps) => (
    <CardSection title="추가적으로 문의사항이 있다면 남겨주세요.">
        <div>
            <Textarea placeholder="주관식 답변" className="bg-white min-h-40" {...form.register('inquiry')} />
        </div>
    </CardSection>
);
