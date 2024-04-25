import React, {memo} from 'react';
import {useRecoilValue} from 'recoil';
import {useTranslation} from 'next-i18next';
import {yyyy_mm_dd_hh_mm} from '^utils/dateTime';
import {Avatar} from '^components/Avatar';
import {getCurrencySymbol} from '^api/tasting.api/gmail/agent/parse-email-price';
import {gmailProfileAtom} from './pageAtoms';
import {useSummaryStatBalance} from './hooks/useSummaryStatBalance';
import {CurrencyToggle} from './CurrencyToggle';
import {MobileInfoListItem} from './MobileInfoListItem';
import {useDraftResult} from './hooks/useDraft';

export const TastingPageLoadedHeaderMobile = memo(() => {
    const gmailProfile = useRecoilValue(gmailProfileAtom);
    const {latestHistory, oldestHistory} = useDraftResult();
    const {t} = useTranslation('publicTasting');
    const {totalPrice} = useSummaryStatBalance('total-balance2');

    const asTimeString = (value: string | Date) => yyyy_mm_dd_hh_mm(new Date(value));

    return (
        <section className="container px-6 border-b bg-white">
            <h1 className="text-2xl font-bold mb-5" style={{lineHeight: 1.3}}>
                {t('payment_list_arrived')}
            </h1>

            {gmailProfile && (
                <div className="flex items-center space-x-2 mb-2">
                    <Avatar src={gmailProfile.picture} className="w-6 h-6" />
                    <p className="text-sm">{gmailProfile.name}</p>
                </div>
            )}
            <h2 className="text-3xl font-bold mb-12">
                <small className="mr-1">{getCurrencySymbol(totalPrice.currency)}</small>
                <span id="total-balance2" />
            </h2>

            <ul className="py-0">
                <MobileInfoListItem label={t('connected_email')} value={gmailProfile?.email} />
                {oldestHistory && (
                    <MobileInfoListItem label={t('search_started_at')} value={asTimeString(oldestHistory.issuedAt)} />
                )}
                {latestHistory && (
                    <MobileInfoListItem label={t('search_finished_at')} value={asTimeString(latestHistory.issuedAt)} />
                )}
                <MobileInfoListItem label={t('display_as_krw')}>
                    <CurrencyToggle className="px-0" leftText="" rightText="" />
                </MobileInfoListItem>
            </ul>
        </section>
    );
});
