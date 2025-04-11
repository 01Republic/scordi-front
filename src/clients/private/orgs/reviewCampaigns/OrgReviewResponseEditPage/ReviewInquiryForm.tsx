import {Card} from '^public/components/ui/card';
import {Textarea} from '^public/components/ui/textarea';
import {UseFormReturn} from 'react-hook-form';
import {UpdateReviewResponseRequestDto} from '^models/ReviewResponse/type';

interface ReviewInquiryFormProps {
    form: UseFormReturn<UpdateReviewResponseRequestDto, any>;
}

export const ReviewInquiryForm = ({form}: ReviewInquiryFormProps) => (
    <Card className="bg-white px-7 py-6 space-y-5">
        <div className="grid w-full items-center space-y-3">
            <div className="text-16 font-medium">추가적으로 문의사항이 있다면 남겨주세요.</div>
            <Textarea placeholder="주관식 답변" className="bg-white min-h-40" {...form.register('inquiry')} />
        </div>
    </Card>
);
