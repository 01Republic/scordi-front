import React, {memo} from 'react';
import {useRecoilValue} from 'recoil';
import {IoMdCalendar} from 'react-icons/io';
import {FaRegCreditCard} from 'react-icons/fa6';
import {BsCash, BsFolderFill} from 'react-icons/bs';
import {roundNumber} from '^utils/number';
import {subscriptionSubjectAtom} from '^clients/private/orgs/subscriptions/OrgSubscriptionDetailPage/atom';
import {StatusCard} from './StatusCard';
import {SubscriptionBasicInfoSection} from './SubscriptionBasicInfoSection';
import {SubscriptionPaymentInfoSection} from './SubscriptionPaymentInfoSection';
import {SubscriptionBusinessInfoSection} from './SubscriptionBusinessInfoSection';

export const SubscriptionInfoTab = memo(function SubscriptionInfoTab() {
    const subscription = useRecoilValue(subscriptionSubjectAtom);

    if (!subscription) return <></>;

    const endNumber = subscription?.creditCard?.secretInfo?.number4;

    const paymentMethodText = subscription?.creditCard?.issuerCompany
        ? `${subscription?.creditCard?.issuerCompany.replace('카드', '').replace('card', '')}${
              endNumber ? `(${endNumber})` : ''
          }`
        : '-';

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
                    titleValue={`${subscription?.currentBillingAmount?.symbol} ${roundNumber(
                        subscription.nextBillingAmount,
                    ).toLocaleString()}`}
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
                    titleValue={paymentMethodText}
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
