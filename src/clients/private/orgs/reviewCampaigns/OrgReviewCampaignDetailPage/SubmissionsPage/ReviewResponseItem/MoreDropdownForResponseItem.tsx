import {memo} from 'react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '^public/components/ui/dropdown-menu';
import {Button} from '^public/components/ui/button';
import {MoreVertical} from 'lucide-react';
import {ReviewResponseDto} from '^models/ReviewResponse/type';
import {reviewResponseApi} from '^models/ReviewResponse/api';
import toast from 'react-hot-toast';

interface MoreDropdownForResponseItemProps {
    response: ReviewResponseDto;
}

export const MoreDropdownForResponseItem = memo((props: MoreDropdownForResponseItemProps) => {
    const {response} = props;
    const {organizationId: orgId, campaignId: id, id: responseId} = response;

    const onRemoveClick = async () => {
        try {
            await reviewResponseApi.destroy(orgId, id, responseId);
            toast.success('응답이 삭제되었습니다.');
        } catch (error) {
            toast.error('응답 삭제에 실패했습니다.');
        }
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                    <MoreVertical className="h-4 w-4" />
                </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="start" className="bg-white" onCloseAutoFocus={(e) => e.preventDefault()}>
                <DropdownMenuItem className="cursor-pointer hover:bg-gray-100" onClick={onRemoveClick}>
                    삭제
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
});
MoreDropdownForResponseItem.displayName = 'MoreDropdownForResponseItem';
