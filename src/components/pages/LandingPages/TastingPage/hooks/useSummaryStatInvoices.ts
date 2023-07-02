import {useEffect} from 'react';
import {useRecoilValue} from 'recoil';
import {CountUp} from 'countup.js';
import {gmailItemsAtom} from '../pageAtoms';

export const useSummaryStatInvoices = (counterElemId: string) => {
    const gmailItems = useRecoilValue(gmailItemsAtom);

    useEffect(() => {
        if (gmailItems.length === 0) return;
        const count = gmailItems.filter((item) => !item.price.hide).length;
        const countUp = new CountUp(counterElemId, count, {
            duration: 0.5,
            separator: ',',
            decimal: '.',
        });
        setTimeout(() => countUp.start(), 0);
    }, [gmailItems]);
};
