import React, {memo} from 'react';
import {useRecoilValue} from 'recoil';
import {useTranslation} from 'next-i18next';
import {yyyy_mm_dd_hh_mm} from '^utils/dateTime';
import {Avatar} from '^components/Avatar';
import {dateSortBy} from '^components/util/date';
import {GmailItem} from '^api/tasting.api';
import {getCurrencySymbol} from '^api/tasting.api/gmail/agent/parse-email-price';
import {draftAccountAtom, gmailItemsAtom, gmailProfileAtom} from './pageAtoms';
import {useSummaryStatBalance} from './hooks/useSummaryStatBalance';
import {CurrencyToggle} from './CurrencyToggle';
import {MobileInfoListItem} from './MobileInfoListItem';

export const TastingPageLoadedHeaderMobile = memo(() => {
    const gmailProfile = useRecoilValue(gmailProfileAtom);
    const gmailItems = useRecoilValue(gmailItemsAtom);
    const draftAccount = useRecoilValue(draftAccountAtom);
    console.log('draftAccount', draftAccount);
    const {t} = useTranslation('publicTasting');
    const {totalPrice} = useSummaryStatBalance('total-balance2');

    const getDateOfItem = (item: GmailItem) => new Date(item.metadata.date);
    const sortedItems = [...gmailItems].sort(dateSortBy('DESC', getDateOfItem));
    const latest = sortedItems[0];
    const oldest = sortedItems[sortedItems.length - 1];

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
                <MobileInfoListItem label={t('search_started_at')} value={yyyy_mm_dd_hh_mm(getDateOfItem(oldest))} />
                <MobileInfoListItem label={t('search_finished_at')} value={yyyy_mm_dd_hh_mm(getDateOfItem(latest))} />
                <MobileInfoListItem label={t('display_as_krw')}>
                    <CurrencyToggle className="px-0" leftText="" rightText="" />
                </MobileInfoListItem>
            </ul>
        </section>
    );
});
