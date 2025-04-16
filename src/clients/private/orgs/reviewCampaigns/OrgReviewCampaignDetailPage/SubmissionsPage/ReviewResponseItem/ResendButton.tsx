import {memo, useState} from 'react';
import {Button} from '^public/components/ui/button';
import {ReviewResponseDto} from '^models/ReviewResponse/type';
import {reviewResponseApi} from '^models/ReviewResponse/api';
import toast from 'react-hot-toast';
import {errorToast} from '^api/api';
import {Spinner} from '^components/util/loading';

interface ResendButtonProps {
    response: ReviewResponseDto;
    reload: () => any;
}

export const ResendButton = memo((props: ResendButtonProps) => {
    const {response, reload} = props;
    const {organizationId: orgId, campaignId: id, id: responseId} = response;
    const [isLoading, setIsLoading] = useState(false);

    const handleResend = async (responseId: number) => {
        setIsLoading(true);
        reviewResponseApi
            .resend(orgId, id, responseId)
            .then(() => reload())
            .then(() => toast.success('알림이 재전송되었습니다.'))
            .catch(errorToast)
            .finally(() => setIsLoading(false));
    };

    return (
        <Button
            variant="outline"
            className={`border-gray-200 w-24 !outline-none cursor-pointer shadow hover:shadow-lg transition-all ${
                isLoading ? 'pointer-events-none opacity-40' : ''
            }`}
            onClick={() => handleResend(response.id)}
        >
            {isLoading ? <Spinner /> : '재전송'}
        </Button>
    );
});
ResendButton.displayName = 'ResendButton';
