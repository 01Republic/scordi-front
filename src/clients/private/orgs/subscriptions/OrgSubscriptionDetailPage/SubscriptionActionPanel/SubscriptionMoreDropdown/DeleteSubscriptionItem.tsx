import React, {memo} from 'react';
import {useRouter} from 'next/router';
import {toast} from 'react-hot-toast';
import {errorToast} from '^api/api';
import {confirm2, confirmed} from '^components/util/dialog';
import {MoreDropdownMenuItem} from '^clients/private/_components/rest-pages/ShowPage/MoreDropdown';
import {subscriptionApi} from '^models/Subscription/api';
import {OrgSubscriptionListPageRoute} from '^pages/orgs/[id]/subscriptions';
import {useCurrentSubscription} from '../../atom';
import {useRemoveSubscription, useSubscriptionTableListAtom} from '^models/Subscription/hook';
import {useIdParam} from '^atoms/common';

export const DeleteSubscriptionItem = memo(() => {
    const id = useIdParam('subscriptionId');
    const {currentSubscription: subscription} = useCurrentSubscription();
    const router = useRouter();
    const {reload} = useSubscriptionTableListAtom();
    const {mutate: deleteSubscription} = useRemoveSubscription(id);

    if (!subscription) return <></>;

    const onClick = async () => {
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
            .then(() => deleteSubscription())
            .then(() => toast.success('구독이 삭제되었어요.'))
            .then(() => router.replace(OrgSubscriptionListPageRoute.path(organizationId)))
            .then(() => reload())
            .catch(errorToast);
    };

    return (
        <MoreDropdownMenuItem onClick={onClick} theme="danger">
            삭제하기
        </MoreDropdownMenuItem>
    );
    // return (
    //     <LinkTo
    //         className="btn btn-square !bg-white border border-slate-300 rounded-md hover:border-slate-400 hover:shadow transition-all mb-1"
    //         onClick={onClick}
    //     >
    //         <CgTrash fontSize={20} color={'red'} />
    //     </LinkTo>
    // );
});
