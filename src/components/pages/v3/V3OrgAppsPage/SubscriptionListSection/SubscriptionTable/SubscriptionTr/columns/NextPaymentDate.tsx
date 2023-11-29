import {memo} from 'react';
import {yyyy_mm_dd} from '^utils/dateTime';

interface NextPaymentDateProps {
    nextPayDate: Date | null;
}

export const NextPaymentDate = memo((props: NextPaymentDateProps) => {
    const {nextPayDate} = props;

    if (!nextPayDate) return <p className="text-sm text-gray-300 italic">-</p>;

    return <p className="text-sm">{yyyy_mm_dd(nextPayDate)}</p>;
});
NextPaymentDate.displayName = 'NextPaymentDate';
