import {useEffect} from 'react';
import {CountUp} from 'countup.js';
import {useDraftResult} from './useDraft';

export const useSummaryStatServices = (counterElemId: string) => {
    const {draftAccount} = useDraftResult();

    useEffect(() => {
        if (!draftAccount) return;
        const count = (draftAccount.invoiceApps || []).length;
        const countUp = new CountUp(counterElemId, count, {
            duration: 0.5,
            separator: ',',
            decimal: '.',
        });
        setTimeout(() => countUp.start(), 0);
    }, [draftAccount]);
};
