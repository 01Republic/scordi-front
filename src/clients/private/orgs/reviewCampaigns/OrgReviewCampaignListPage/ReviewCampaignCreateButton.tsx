import {memo} from 'react';
import {Plus} from 'lucide-react';
import {LinkTo} from '^components/util/LinkTo';
import {OrgReviewCampaignNewPageRoute} from '^pages/orgs/[id]/reviewCampaigns/new';
import {useSubscriptions2} from '^models/Subscription/hook';
import {confirm2, confirmed} from '^components/util/dialog';
import {useRouter} from 'next/router';
import {OrgSubscriptionListPageRoute} from '^pages/orgs/[id]/subscriptions';

interface ReviewCampaignCreateButtonProps {
    orgId: number;
}

export const ReviewCampaignCreateButton = memo((props: ReviewCampaignCreateButtonProps) => {
    const {orgId} = props;
    const router = useRouter();
    const {
        data: {pagination},
    } = useSubscriptions2(orgId, {
        itemsPerPage: 1,
        order: {id: 'DESC'},
    });

    const noSubscriptionHaveAlert = () => {
        const openConfirm = () => confirm2('요청을 시작하기 전에 구독을 먼저 불러와야 해요.');

        confirmed(openConfirm())
            .then(() => router.push(OrgSubscriptionListPageRoute.path(orgId)))
            .catch(console.log);
    };

    if (!pagination.totalItemCount) {
        return (
            <LinkTo
                onClick={noSubscriptionHaveAlert}
                className="btn btn-scordi gap-2 no-animation btn-animation"
                loadingOnBtn
            >
                <Plus />
                <span>새 요청 만들기</span>
            </LinkTo>
        );
    }

    return (
        <LinkTo
            href={OrgReviewCampaignNewPageRoute.path(orgId)}
            className="btn btn-scordi gap-2 no-animation btn-animation"
            loadingOnBtn
        >
            <Plus />
            <span>새 요청 만들기</span>
        </LinkTo>
    );
});
ReviewCampaignCreateButton.displayName = 'ReviewCampaignCreateButton';
