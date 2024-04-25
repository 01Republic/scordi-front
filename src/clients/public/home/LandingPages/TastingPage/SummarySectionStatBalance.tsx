import React, {memo} from 'react';
import {useRecoilValue} from 'recoil';
import {useTranslation} from 'next-i18next';
import {getCurrencySymbol} from '^api/tasting.api/gmail/agent/parse-email-price';
import {gmailItemsLoadedAtom} from './pageAtoms';
import {useSummaryStatBalance} from './hooks/useSummaryStatBalance';

export const SummarySectionStatBalance = memo(() => {
    const isLoaded = useRecoilValue(gmailItemsLoadedAtom);
    const {t} = useTranslation('publicTasting');
    const {totalPrice} = useSummaryStatBalance('total-balance');

    return (
        <div className="stats bg-[#fafafa] shadow-xl sm:min-w-[20%]">
            <div className="stat place-items-center py-7">
                <div className="stat-title !text-black !opacity-100 font-semibold mb-3">
                    {t('summary_stat.balance.label')}
                </div>
                <div
                    className={`stat-value !text-3xl ${
                        !isLoaded ? 'w-full bg-slate-300 rounded-full animate-pulse' : ''
                    }`}
                >
                    {isLoaded && <small className="mr-1">{getCurrencySymbol(totalPrice.currency)}</small>}
                    <span id="total-balance" className="!text-4xl" />
                    &nbsp;
                </div>
            </div>
        </div>
    );
});
