import Tippy from '@tippyjs/react';
import {errorToast} from '^api/api';
import {MoreDropdown} from '^clients/private/_components/MoreDropdown';
import {Spinner} from '^components/util/loading';
import {ReviewCampaignDto} from '^models/ReviewCampaign/type';
import {reviewResponseApi} from '^models/ReviewResponse/api';
import {ReviewResponseDto, UpdateReviewResponseRequestDto} from '^models/ReviewResponse/type';
import {Button, ButtonProps} from '^public/components/ui/button';
import {WithChildren} from '^types/global.type';
import {ArrowRightLeft} from 'lucide-react';
import {useTranslation} from 'next-i18next';
import {memo, useState} from 'react';
import {toast} from 'react-hot-toast';

interface SubmitStatusHandlerProps {
    response: ReviewResponseDto;
    campaign?: ReviewCampaignDto;
    reload: () => any;
}

export const SubmitStatusHandler = memo((props: SubmitStatusHandlerProps) => {
    const {response, campaign, reload} = props;
    const {t} = useTranslation('reviewCampaigns');
    const {organizationId: orgId, campaignId, id} = response;
    const [isLoading, setIsLoading] = useState(false);

    const update = (dto: UpdateReviewResponseRequestDto, hide: () => any) => {
        setIsLoading(true);
        hide();
        return reviewResponseApi
            .update(orgId, campaignId, id, dto)
            .then(() => reload())
            .then(() => toast.success(t('submissions.changeSuccess')))
            .catch(errorToast)
            .finally(() => setIsLoading(false));
    };

    if (!campaign) return <></>;

    if (campaign.isClosed() || campaign.isOverdue()) {
        return (
            <Tippy content={t('submissions.requestClosed')}>
                <div>
                    <SubmitStatusHandlerButton disabled>
                        {response.submittedAt ? (
                            t('submissions.submitted')
                        ) : (
                            <span>
                                {t('submissions.notSubmitted')}
                                {<span className="text-red-500 text-12">({t('submissions.notSubmittedClosed')})</span>}
                            </span>
                        )}
                    </SubmitStatusHandlerButton>
                </div>
            </Tippy>
        );
    }

    return (
        <MoreDropdown
            Trigger={() => (
                <SubmitStatusHandlerButton variant={response.submittedAt ? 'outline' : 'scordi'} isLoading={isLoading}>
                    {response.submittedAt ? t('submissions.submitted') : t('submissions.notSubmitted')}
                </SubmitStatusHandlerButton>
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
                            <span>{t('submissions.notSubmitted')}</span>
                        </MoreDropdown.MenuItem>
                    ) : (
                        <MoreDropdown.MenuItem
                            className="flex items-center gap-2"
                            onClick={() => update({submittedAt: new Date()}, hide)}
                        >
                            <ArrowRightLeft />
                            <span>{t('submissions.submitComplete')}</span>
                        </MoreDropdown.MenuItem>
                    )}
                </MoreDropdown.Content>
            )}
        </MoreDropdown>
    );
});
SubmitStatusHandler.displayName = 'SubmitStatusHandler';

interface Props extends WithChildren {
    variant?: ButtonProps['variant'];
    disabled?: boolean;
    isLoading?: boolean;
}

const SubmitStatusHandlerButton = (props: Props) => {
    const {variant, disabled = false, isLoading = false, children} = props;

    return (
        <Button
            variant={disabled ? 'grayOutline' : variant}
            className={`border-gray-200 w-24 !outline-none cursor-pointer shadow hover:shadow-lg transition-all ${
                isLoading ? 'pointer-events-none opacity-40' : ''
            } ${disabled ? 'pointer-events-none' : ''}`}
        >
            {isLoading ? <Spinner /> : children}
        </Button>
    );
};
