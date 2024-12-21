import React, {memo} from 'react';
import {CgMore, CgTrash} from 'react-icons/cg';
import {MdOutlineFreeBreakfast, MdOutlinePayment, MdRefresh} from 'react-icons/md';
import {RiShareBoxLine} from 'react-icons/ri';
import {
    subscriptionSubjectAtom,
    useCurrentSubscription,
} from '^clients/private/orgs/subscriptions/OrgSubscriptionDetailPage/atom';
import {useRecoilValue} from 'recoil';
import {subscriptionApi} from '^models/Subscription/api';
import {toast} from 'react-hot-toast';
import {useRouter} from 'next/router';
import {OrgSubscriptionListPageRoute} from '^pages/orgs/[id]/subscriptions';
import {
    ListPageDropdown,
    ListPageDropdownMenu,
    MethodOption,
} from '^clients/private/_layouts/_shared/ListPageMainDropdown';
import {FaQuestion} from 'react-icons/fa6';
import {PiEmptyBold} from 'react-icons/pi';
import {SubscriptionStatus, SubscriptionUsingStatus} from '^models/Subscription/types';
import {confirm2} from '^components/util/dialog';

export const SubscriptionActionPanel = memo(function SubscriptionActionPanel() {
    const {reload, currentSubscription: subscription} = useCurrentSubscription();
    const router = useRouter();

    if (!subscription) return null;

    const handleGoToPricingPage = () => {
        window.open(subscription.product.pricingPageUrl, '_blank');
    };

    const handleChangeStatus = (status: SubscriptionUsingStatus) => {
        // TODO: readonly 임. (readonly usingStatus: SubscriptionUsingStatus)
        // subscriptionApi.update(subscription.id, {status}).then(() => {
        //     toast.success('구독 상태가 변경되었어요.');
        //     reload();
        // });
    };

    const handleRemove = async () => {
        const isConfirmed = await confirm2(
            '구독을 삭제할까요?',
            <div className="text-16">
                이 작업은 취소할 수 없습니다.
                <br />
                <b>워크스페이스 전체</b>에서 삭제됩니다. <br />
                그래도 삭제하시겠어요?
            </div>,
            'warning',
        ).then((res) => res.isConfirmed);
        if (!isConfirmed) return;
        subscriptionApi.destroy(subscription?.id).then(() => {
            toast.success('구독이 삭제되었어요.');
            router.replace(OrgSubscriptionListPageRoute.path(subscription.organizationId));
        });
    };

    const actionButtons = [
        {
            icon: <RiShareBoxLine fontSize={20} />,
            onClick: handleGoToPricingPage,
        },
        {
            icon: <CgTrash fontSize={20} color={'red'} />,
            onClick: handleRemove,
        },
    ];

    return (
        <div className="flex justify-end gap-4">
            {actionButtons.map((button, index) => (
                <button
                    key={index}
                    tabIndex={0}
                    className={`btn btn-square !bg-white border border-slate-300 rounded-md hover:border-slate-400 hover:shadow transition-all mb-1`}
                    onClick={button.onClick}
                >
                    {button.icon}
                </button>
            ))}
        </div>
    );
});
