import {memo, useState} from 'react';
import {cn} from '^public/lib/utils';
import {MoreDropdown} from '^clients/private/_components/MoreDropdown';
import {ReviewResponseDto, UpdateReviewResponseRequestDto} from '^models/ReviewResponse/type';
import {reviewResponseApi} from '^models/ReviewResponse/api';
import {toast} from 'react-hot-toast';
import {errorToast} from '^api/api';
import {Spinner} from '^components/util/loading';
import {ArrowRightLeft} from 'lucide-react';
import {Button} from '^public/components/ui/button';
import {ReviewCampaignDto} from '^models/ReviewCampaign/type';
import Tippy from '@tippyjs/react';

interface SubmitStatusHandlerProps {
    response: ReviewResponseDto;
    campaign?: ReviewCampaignDto;
    reload: () => any;
}

export const SubmitStatusHandler = memo((props: SubmitStatusHandlerProps) => {
    const {response, campaign, reload} = props;
    const {organizationId: orgId, campaignId, id} = response;
    const [isLoading, setIsLoading] = useState(false);

    const update = (dto: UpdateReviewResponseRequestDto, hide: () => any) => {
        setIsLoading(true);
        hide();
        return reviewResponseApi
            .update(orgId, campaignId, id, dto)
            .then(() => reload())
            .then(() => toast.success('변경했어요'))
            .catch(errorToast)
            .finally(() => setIsLoading(false));
    };

    if (!campaign || campaign.isOverdue()) {
        return (
            <Tippy content="요청이 마감되었어요.">
                <div>
                    <Button
                        variant={response.submittedAt ? 'grayOutline' : 'grayOutline'}
                        className={`border-gray-200 w-24 !outline-none cursor-pointer shadow hover:shadow-lg transition-all pointer-events-none`}
                    >
                        {response.submittedAt ? (
                            '제출 완료'
                        ) : (
                            <span>미제출{<span className="text-red-500 text-12">(마감)</span>}</span>
                        )}
                    </Button>
                </div>
            </Tippy>
        );
    }

    return (
        <MoreDropdown
            Trigger={() => (
                <Button
                    variant={response.submittedAt ? 'outline' : 'scordi'}
                    className={`border-gray-200 w-24 !outline-none cursor-pointer shadow hover:shadow-lg transition-all ${
                        isLoading ? 'pointer-events-none opacity-40' : ''
                    }`}
                >
                    {isLoading ? <Spinner /> : response.submittedAt ? '제출 완료' : '미제출'}
                </Button>
            )}
            offset={[0, 5]}
            placement="bottom-end"
        >
            {({hide}) => (
                <MoreDropdown.Content className={`!min-w-[initial] w-24 !py-0.5 ${isLoading ? 'hidden' : ''}`}>
                    {response.submittedAt ? (
                        <MoreDropdown.MenuItem
                            className="flex items-center gap-2"
                            onClick={() => update({submittedAt: null}, hide)}
                        >
                            <ArrowRightLeft />
                            <span>미제출</span>
                        </MoreDropdown.MenuItem>
                    ) : (
                        <MoreDropdown.MenuItem
                            className="flex items-center gap-2"
                            onClick={() => update({submittedAt: new Date()}, hide)}
                        >
                            <ArrowRightLeft />
                            <span>제출완료</span>
                        </MoreDropdown.MenuItem>
                    )}
                </MoreDropdown.Content>
            )}
        </MoreDropdown>
    );
});
SubmitStatusHandler.displayName = 'SubmitStatusHandler';
