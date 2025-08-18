import {ConnectedAssetCard} from '^clients/private/orgs/subscriptions/OrgSubscriptionDetailPage/SubscriptionInfoTab/ConnectedAssetCard';
import {lpp} from '^utils/dateTime';
import {roundNumber} from '^utils/number';
import {subHours} from 'date-fns';
import {Banknote, Calendar, Folder} from 'lucide-react';
import {useTranslation} from 'next-i18next';
import {memo} from 'react';
import {useRecoilValue} from 'recoil';
import {subscriptionSubjectAtom} from '../atom';
import {StatusCard} from './StatusCard';
import {SubscriptionBasicInfoSection} from './SubscriptionBasicInfoSection';
import {SubscriptionBusinessInfoSection} from './SubscriptionBusinessInfoSection';
import {SubscriptionPaymentInfoSection} from './SubscriptionPaymentInfoSection';

/**
 * 구독 상세p > 정보탭
 */
export const SubscriptionInfoTab = memo(function SubscriptionInfoTab() {
    const subscription = useRecoilValue(subscriptionSubjectAtom);
    const {t} = useTranslation('subscription');

    if (!subscription) return <></>;

    return (
        <div className={'py-4 space-y-4'}>
            <div className={'bg-gray-200 flex flex-col sm:grid sm:grid-cols-2 lg:grid-cols-4 p-4 gap-4 rounded'}>
                <StatusCard
                    label={t('detail.infoTab.status.label')}
                    value={subscription?.isFreeTier ? t('detail.infoTab.status.free') : t('detail.infoTab.status.paid')}
                    icon={<Folder className="size-5 text-white" />}
                    iconColor={'bg-purple-400'}
                />
                <StatusCard
                    label={t('detail.infoTab.paymentAmount.label')}
                    value={`${subscription?.currentBillingAmount?.symbol} ${roundNumber(
                        subscription.nextBillingAmount,
                    ).toLocaleString()}`}
                    icon={<Banknote className="size-6 text-white" />}
                    iconColor={'bg-orange-400'}
                />
                <StatusCard
                    label={t('detail.infoTab.nextBillingDate.label')}
                    value={subscription?.nextBillingDate ? lpp(subHours(subscription.nextBillingDate, 9), 'P') : '-'}
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
