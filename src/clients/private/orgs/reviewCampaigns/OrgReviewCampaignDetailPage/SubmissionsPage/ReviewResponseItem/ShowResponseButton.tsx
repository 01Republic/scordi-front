import {memo} from 'react';
import {ReviewResponseDto} from '^models/ReviewResponse/type';
import {OrgReviewResponseShowPageRoute} from '^pages/orgs/[id]/reviewCampaigns/[reviewCampaignId]/reviewResponses/[reviewResponseId]';
import {ButtonLink} from '^public/components/ui/button';

interface ShowResponseButtonProps {
    response: ReviewResponseDto;
    text?: string;
}

export const ShowResponseButton = memo((props: ShowResponseButtonProps) => {
    const {response, text} = props;

    return (
        <ButtonLink
            variant="outline"
            className={`border-gray-200 w-24 !outline-none cursor-pointer shadow hover:shadow-lg transition-all`}
            href={OrgReviewResponseShowPageRoute.resourcePath(response)}
            displayLoading={false}
        >
            {text || '응답 확인'}
        </ButtonLink>
    );
});
ShowResponseButton.displayName = 'ShowResponseButton';
