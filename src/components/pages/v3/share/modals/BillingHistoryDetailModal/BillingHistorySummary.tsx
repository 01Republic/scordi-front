import React, {memo} from 'react';
import {useRecoilValue} from 'recoil';
import {displayCurrencyAtom} from '^tasting/pageAtoms';
import {useTranslation} from 'next-i18next';
import {dayjs} from '^utils/dayjs';
import {getCurrencySymbol} from '^api/tasting.api/gmail/agent/parse-email-price';
import {useRouter} from 'next/router';
import {BillingHistoryManager} from '^models/BillingHistory/manager';
import {BillingHistoryDto} from '^models/BillingHistory/type';
import {useModal} from '^v3/share/modals';
import {payMethodModalState} from '^v3/share/modals/NewBillingHistoryModal/atoms';
import {PlusCircle} from 'lucide-react';

interface BillingHistorySummaryProps {
    billingHistories: BillingHistoryDto[];
}

export const BillingHistorySummary = memo((props: BillingHistorySummaryProps) => {
    const router = useRouter();
    const {billingHistories} = props;
    const displayCurrency = useRecoilValue(displayCurrencyAtom);
    const {t} = useTranslation('org-home');
    const {open} = useModal(payMethodModalState);

    dayjs.locale(router.locale);

    const BillingHistory = BillingHistoryManager.init(billingHistories).validateToListing();
    const oldest = BillingHistory.oldestIssue().take();
    const since = oldest ? dayjs(oldest.issuedAt).fromNow() : '';

    return (
        <>
            <div className="bg-white z-10">
                <div className="py-3 flex items-center justify-between">
                    <p className="text-xl font-semibold flex items-center">
                        {since ? (
                            <span dangerouslySetInnerHTML={{__html: t('result_in_since_n_ago', {since})}}></span>
                        ) : (
                            <span>{t('result_of_no_histories')}</span>
                        )}
                    </p>

                    <div className="tooltip tooltip-top tooltip-primary" data-tip="추가">
                        <button
                            onClick={open}
                            className="relative text-indigo-400 hover:text-indigo-600 transition-all"
                        >
                            <PlusCircle className="" size={24} strokeWidth={0.3} />
                        </button>
                    </div>
                </div>
            </div>

            <div className="flex items-center justify-around py-3">
                <div className="text-center">
                    <p className="text-sm text-gray-500 mb-1">{t('summary_stat.counter.label')}</p>
                    <p className="font-semibold text-18">
                        <span className="">{BillingHistory.length}</span>
                        <small>&nbsp;{t('summary_stat.counter.unit')}</small>
                    </p>
                </div>

                <div className="text-center">
                    <p className="text-sm text-gray-500 mb-1">{t('summary_stat.balance.label')}</p>
                    <p className="font-semibold text-18">
                        <small className="mr-1">{getCurrencySymbol(displayCurrency)}</small>
                        <span className="">{BillingHistory.getTotalPrice(displayCurrency).toLocaleString()}</span>
                        {/*<small className={!isLoaded ? 'invisible' : ''}>&nbsp;{t('summary_stat.invoice.unit')}</small>*/}
                    </p>
                </div>
            </div>

            <hr className="py-3" />
        </>
    );
});
