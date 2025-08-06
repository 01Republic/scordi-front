import {confirm2, confirmed} from '^components/util/dialog';
import {LinkTo} from '^components/util/LinkTo';
import {useSubscriptions2} from '^models/Subscription/hook';
import {OrgReviewCampaignNewPageRoute} from '^pages/orgs/[id]/reviewCampaigns/new';
import {OrgSubscriptionListPageRoute} from '^pages/orgs/[id]/subscriptions';
import {Plus} from 'lucide-react';
import {useTranslation} from 'next-i18next';
import {useRouter} from 'next/router';
import {memo} from 'react';

interface ReviewCampaignCreateButtonProps {
    orgId: number;
}

export const ReviewCampaignCreateButton = memo((props: ReviewCampaignCreateButtonProps) => {
    const {orgId} = props;
    const {t} = useTranslation('reviewCampaigns');
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
                <span className="text-xl">{t('create.noSubscriptionAlert.title')}</span>,
                <div className="text-16">
                    <div>{t('create.noSubscriptionAlert.message')}</div>
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
                <span>{t('list.createButton')}</span>
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
            <span>{t('list.createButton')}</span>
        </LinkTo>
    );
});
ReviewCampaignCreateButton.displayName = 'ReviewCampaignCreateButton';
