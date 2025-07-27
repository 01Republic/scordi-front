import React, {memo} from 'react';
import {useRecoilValue} from 'recoil';
import {roundNumber} from '^utils/number';
import {Banknote, Calendar, Folder} from 'lucide-react';
import {subscriptionSubjectAtom} from '../atom';
import {StatusCard} from './StatusCard';
import {SubscriptionBasicInfoSection} from './SubscriptionBasicInfoSection';
import {SubscriptionPaymentInfoSection} from './SubscriptionPaymentInfoSection';
import {SubscriptionBusinessInfoSection} from './SubscriptionBusinessInfoSection';
import {ConnectedAssetCard} from './ConnectedAssetCard';
import {lpp} from '^utils/dateTime';

/**
 * 구독 상세p > 정보탭
 */
export const SubscriptionInfoTab = memo(function SubscriptionInfoTab() {
    const subscription = useRecoilValue(subscriptionSubjectAtom);

    if (!subscription) return <></>;

    return (
        <div className={'py-4 space-y-4'}>
            <div className={'bg-gray-200 flex flex-col sm:grid sm:grid-cols-2 lg:grid-cols-4 p-4 gap-4 rounded'}>
                <StatusCard
                    label={'구독상태'}
                    value={subscription?.isFreeTier ? '무료' : '유료'}
                    icon={<Folder className="size-5 text-white" />}
                    iconColor={'bg-purple-400'}
                />
                <StatusCard
                    label={'결제 예정 금액'}
                    value={`${subscription?.currentBillingAmount?.symbol} ${roundNumber(
                        subscription.nextBillingAmount,
                    ).toLocaleString()}`}
                    icon={<Banknote className="size-6 text-white" />}
                    iconColor={'bg-orange-400'}
                />
                <StatusCard
                    label={'다음 결제 예정일'}
                    value={subscription?.nextBillingDate ? lpp(subscription.nextBillingDate, 'P') : '-'}
                    icon={<Calendar className="size-5 text-white" />}
                    iconColor={'bg-pink-400'}
                />

                {/* 결제수단 */}
                <ConnectedAssetCard subscription={subscription} />
            </div>

            {/* 기본 정보 */}
            <SubscriptionBasicInfoSection />

            {/* 결제 정보 */}
            <SubscriptionPaymentInfoSection />

            {/* 거래처 정보 */}
            <SubscriptionBusinessInfoSection />
        </div>
    );
});
