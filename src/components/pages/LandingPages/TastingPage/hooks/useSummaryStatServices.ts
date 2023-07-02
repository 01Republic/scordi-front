import {useEffect} from 'react';
import {useRecoilValue} from 'recoil';
import {CountUp} from 'countup.js';
import {draftAccountAtom} from '../pageAtoms';

export const useSummaryStatServices = (counterElemId: string) => {
    const draftAccount = useRecoilValue(draftAccountAtom);

    useEffect(() => {
        if (!draftAccount) return;
        const count = draftAccount.invoiceApps.length;
        const countUp = new CountUp(counterElemId, count, {
            duration: 0.5,
            separator: ',',
            decimal: '.',
        });
        setTimeout(() => countUp.start(), 0);
    }, [draftAccount]);
};
