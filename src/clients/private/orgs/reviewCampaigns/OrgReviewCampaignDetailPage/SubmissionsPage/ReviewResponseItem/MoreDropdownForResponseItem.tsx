import {errorToast} from '^api/api';
import {confirm2, confirmed} from '^components/util/dialog';
import {reviewResponseApi} from '^models/ReviewResponse/api';
import {ReviewResponseDto} from '^models/ReviewResponse/type';
import {Button} from '^public/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '^public/components/ui/dropdown-menu';
import {MoreVertical} from 'lucide-react';
import {useTranslation} from 'next-i18next';
import {memo} from 'react';
import toast from 'react-hot-toast';

interface MoreDropdownForResponseItemProps {
    response: ReviewResponseDto;
    reload: () => void;
}

export const MoreDropdownForResponseItem = memo((props: MoreDropdownForResponseItemProps) => {
    const {response, reload} = props;
    const {t} = useTranslation('reviewCampaigns');
    const {organizationId: orgId, campaignId: id, id: responseId} = response;

    const onRemoveClick = async () => {
        const sync = () => confirm2(t('submissions.deleteConfirm') as string);
        confirmed(sync())
            .then(() => reviewResponseApi.destroy(orgId, id, responseId))
            .then(() => toast.success(t('submissions.deleteSuccess')))
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
                    {t('submissions.delete')}
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
});
MoreDropdownForResponseItem.displayName = 'MoreDropdownForResponseItem';
