import {SummaryOfState} from '^types/dashboard.type';
import {currencyFormatWithI18n, roundNumber, unitFormat} from '^utils/number';
import {useTranslation} from 'next-i18next';
import {memo} from 'react';

interface ExpenseSectionSummaryProps {
    summaryOfState?: SummaryOfState;
}

export const ExpenseSectionSummary = memo((props: ExpenseSectionSummaryProps) => {
    const {summaryOfState} = props;
    const {t} = useTranslation('common');

    return (
        <p className="font-bold text-20 md:text-24 lg:text-28 flex items-center gap-2 lg:gap-3">
            <span>{currencyFormatWithI18n(roundNumber(summaryOfState?.amount || 0), t)}</span>
            <span>·</span>
            <span>{unitFormat(summaryOfState?.count || 0, t('items') as string)}</span>
        </p>
    );
});
ExpenseSectionSummary.displayName = 'ExpenseSectionSummary';
