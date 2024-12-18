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

export const SubscriptionActionPanel = memo(function SubscriptionActionPanel() {
    const {reload, currentSubscription: subscription} = useCurrentSubscription();
    const router = useRouter();

    if (!subscription) return null;

    const handleGoToPricingPage = () => {
        window.open(subscription.product.pricingPageUrl, '_blank');
    };

    const handleRefresh = () => {
        // TODO 이거 뭔기능이더라.. -> 카드나 이메일 동기화하는 기능 -> 규리님이랑 논의 필요
        toast.success('refresh');
    };

    const handleChangeStatus = (status: SubscriptionUsingStatus) => {
        // TODO: readonly 임. (readonly usingStatus: SubscriptionUsingStatus)
        // subscriptionApi.update(subscription.id, {status}).then(() => {
        //     toast.success('구독 상태가 변경되었어요.');
        //     reload();
        // });
    };

    const handleRemove = () => {
        // TODO: 예쁜 모달로 변경
        const confirm = window.confirm('정말 삭제하시겠어요?');
        if (!confirm) return;
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

            <ListPageDropdown>
                <button
                    tabIndex={0}
                    className={`btn btn-square !bg-white border border-slate-300 rounded-md hover:border-slate-400 hover:shadow transition-all mb-1`}
                >
                    <CgMore fontSize={20} />
                </button>

                <ListPageDropdownMenu>
                    <MethodOption
                        Icon={MdOutlineFreeBreakfast}
                        title="무료로 변경"
                        onClick={() => handleChangeStatus(SubscriptionUsingStatus.FREE)}
                    />
                    <MethodOption
                        Icon={MdOutlinePayment}
                        title="유료로 변경"
                        onClick={() => handleChangeStatus(SubscriptionUsingStatus.PAID)}
                    />
                    <MethodOption
                        Icon={FaQuestion}
                        title="미정으로 변경"
                        onClick={() => handleChangeStatus(SubscriptionUsingStatus.NONE)}
                    />
                    <MethodOption
                        Icon={PiEmptyBold}
                        title="해지 상태로 변경"
                        onClick={() => handleChangeStatus(SubscriptionUsingStatus.QUIT)}
                    />
                    <MethodOption Icon={CgTrash} title="구독 삭제하기" onClick={handleRemove} />
                </ListPageDropdownMenu>
            </ListPageDropdown>
        </div>
    );
});
