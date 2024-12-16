import React, {memo} from 'react';
import {SubscriptionPaymentInfoSection} from '^clients/private/orgs/subscriptions/OrgSubscriptionDetailPage/components/SubscriptionPaymentInfoSection';
import {StatusCard} from '^clients/private/orgs/subscriptions/OrgSubscriptionDetailPage/components/StatusCard';
import {FaRegCreditCard} from 'react-icons/fa6';
import {SubscriptionBasicInfoSection} from '^clients/private/orgs/subscriptions/OrgSubscriptionDetailPage/components/SubscriptionBasicInfoSection';
import {IoMdCalendar} from 'react-icons/io';
import {BsCash, BsFolderFill} from 'react-icons/bs';
import {useRecoilValue} from 'recoil';
import {subscriptionSubjectAtom} from '^clients/private/orgs/subscriptions/OrgSubscriptionDetailPage/atom';
import {SubscriptionBusinessInfoSection} from '^clients/private/orgs/subscriptions/OrgSubscriptionDetailPage/components/SubscriptionBusinessInfoSection';

export const SubscriptionInfoTab = memo(function SubscriptionInfoTab() {
    const subscription = useRecoilValue(subscriptionSubjectAtom);

    const endNumber = subscription?.creditCard?.secretInfo?.number4;

    return (
        <div className={'py-4 space-y-4'}>
            <div className={'bg-gray-200 grid grid-cols-4 p-4 space-x-4 rounded'}>
                <StatusCard
                    title={'구독상태'}
                    titleValue={subscription?.isFreeTier ? '무료' : '유료'}
                    icon={<BsFolderFill size={20} className="h-full w-full p-[6px] text-white" />}
                    iconColor={'bg-purple-400'}
                />
                <StatusCard
                    title={'결제 예정 금액'}
                    titleValue={
                        `${
                            subscription?.currentBillingAmount?.symbol
                        } ${subscription?.nextBillingAmount.toLocaleString()}` || '-'
                    }
                    icon={<BsCash size={20} className="h-full w-full p-[6px] text-white" />}
                    iconColor={'bg-orange-400'}
                />
                <StatusCard
                    title={'다음 결제 예정일'}
                    titleValue={subscription?.nextBillingDate || '-'}
                    icon={<IoMdCalendar size={20} className="h-full w-full p-[6px] text-white" />}
                    iconColor={'bg-pink-400'}
                />
                <StatusCard
                    title={'결제수단'}
                    titleValue={
                        `${(subscription?.creditCard?.issuerCompany || '')
                            .replace('카드', '')
                            .replace('card', '')}(${endNumber})` || '-'
                    }
                    icon={<FaRegCreditCard size={20} className="h-full w-full p-[6px] text-white" />}
                    iconColor={'bg-blue-400'}
                />
            </div>
            <SubscriptionBasicInfoSection />
            <SubscriptionPaymentInfoSection />
            <SubscriptionBusinessInfoSection />
        </div>
    );
});
