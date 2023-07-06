import {useEffect} from 'react';
import {CountUp} from 'countup.js';
import {useDraftResult} from './useDraft';

export const useSummaryStatInvoices = (counterElemId: string) => {
    const {billingHistories} = useDraftResult();

    useEffect(() => {
        if (billingHistories.length === 0) return;
        const count = billingHistories.filter((his) => !his.emailContent?.price.hide).length;
        const countUp = new CountUp(counterElemId, count, {
            duration: 0.5,
            separator: ',',
            decimal: '.',
        });
        setTimeout(() => countUp.start(), 0);
    }, [billingHistories]);
};
