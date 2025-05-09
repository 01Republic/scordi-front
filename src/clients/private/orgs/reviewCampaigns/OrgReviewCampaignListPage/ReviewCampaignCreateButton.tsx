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
        const openConfirm = () =>
            confirm2(
                <span className="text-xl">구성원에게 구독 사용여부 응답을 요청할 수 없어요.</span>,
                <div className="text-16">
                    <div>요청을 시작하기 전, 구독을 먼저 불러와야 해요.</div>
                    <div>불러온 구독을 기준으로 구성원에게 실사용여부를 파악할 수 있어요.</div>
                    <br />
                    <div>구독을 먼저 불러올까요?</div>
                </div>,
            );

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
