import {memo} from 'react';
import {currencyFormat, roundNumber, unitFormat} from '^utils/number';
import {SummaryOfState} from '^types/dashboard.type';

interface ExpenseSectionSummaryProps {
    summaryOfState?: SummaryOfState;
}

export const ExpenseSectionSummary = memo((props: ExpenseSectionSummaryProps) => {
    const {summaryOfState} = props;

    return (
        <p className="font-bold text-28 flex items-center gap-3">
            <span>{currencyFormat(roundNumber(summaryOfState?.amount || 0))}</span>
            <span>·</span>
            <span>{unitFormat(summaryOfState?.count || 0, '개')}</span>
        </p>
    );
});
ExpenseSectionSummary.displayName = 'ExpenseSectionSummary';
