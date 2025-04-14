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
import {confirm2, confirmed} from '^components/util/dialog';
import {errorToast} from '^api/api';

interface MoreDropdownForResponseItemProps {
    response: ReviewResponseDto;
    reload: () => void;
}

export const MoreDropdownForResponseItem = memo((props: MoreDropdownForResponseItemProps) => {
    const {response, reload} = props;
    const {organizationId: orgId, campaignId: id, id: responseId} = response;

    const onRemoveClick = async () => {
        const sync = () => confirm2('응답을 삭제하시겠습니까?');
        confirmed(sync())
            .then(() => reviewResponseApi.destroy(orgId, id, responseId))
            .then(() => toast.success('응답이 삭제되었습니다.'))
            .catch(errorToast)
            .finally(() => reload());
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
