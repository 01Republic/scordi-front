import React, {memo} from 'react';
import {CgTrash} from 'react-icons/cg';
import {MdRefresh} from 'react-icons/md';
import {RiShareBoxLine} from 'react-icons/ri';
import {subscriptionSubjectAtom} from '^clients/private/orgs/subscriptions/OrgSubscriptionDetailPage/atom';
import {useRecoilValue} from 'recoil';
import {subscriptionApi} from '^models/Subscription/api';
import {toast} from 'react-hot-toast';
import {useRouter} from 'next/router';
import {OrgSubscriptionListPageRoute} from '^pages/orgs/[id]/subscriptions';

export const SubscriptionActionPanel = memo(function SubscriptionActionPanel() {
    const subscription = useRecoilValue(subscriptionSubjectAtom);
    const router = useRouter();

    if (!subscription) return null;

    const handleGoToPricingPage = () => {
        window.open(subscription.product.pricingPageUrl, '_blank');
    };

    const handleRefresh = () => {
        // TODO 이거 뭔기능이더라..
        toast.success('refresh');
    };

    const handleRemove = () => {
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
            icon: <MdRefresh fontSize={20} />,
            onClick: handleRefresh,
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
