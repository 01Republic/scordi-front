import React, {memo} from 'react';
import {useRouter} from 'next/router';
import {toast} from 'react-hot-toast';
import {CgTrash} from 'react-icons/cg';
import {errorToast} from '^api/api';
import {subscriptionApi} from '^models/Subscription/api';
import {OrgSubscriptionListPageRoute} from '^pages/orgs/[id]/subscriptions';
import {useCurrentSubscription} from '../atom';
import {confirm2, confirmed} from '^components/util/dialog';
import {LinkTo} from '^components/util/LinkTo';

export const SubscriptionRemoveButton = memo(() => {
    const {currentSubscription: subscription} = useCurrentSubscription();
    const router = useRouter();

    if (!subscription) return <></>;

    const handleRemove = async () => {
        const {id, organizationId} = subscription;

        const removeConfirm = () =>
            confirm2(
                '구독을 삭제할까요?',
                <div className="text-16">
                    이 작업은 취소할 수 없습니다.
                    <br />
                    <b>워크스페이스 전체</b>에서 삭제됩니다. <br />
                    그래도 삭제하시겠어요?
                </div>,
                'warning',
            );

        return confirmed(removeConfirm())
            .then(() => subscriptionApi.destroy(id))
            .then(() => toast.success('구독이 삭제되었어요.'))
            .then(() => router.replace(OrgSubscriptionListPageRoute.path(organizationId)))
            .catch(errorToast);
    };

    return (
        <LinkTo
            className="btn btn-square !bg-white border border-slate-300 rounded-md hover:border-slate-400 hover:shadow transition-all mb-1"
            onClick={handleRemove}
        >
            <CgTrash fontSize={20} color={'red'} />
        </LinkTo>
    );
});
