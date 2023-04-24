import React, {memo, useEffect, useState} from 'react';
import {useRecoilValue} from 'recoil';
import {gmailItemsAtom, gmailItemsLoadedAtom} from '^components/pages/TastingPage/pageAtoms';
import {CountUp} from 'countup.js';

export const SummarySectionStatInvoices = memo(() => {
    const gmailItems = useRecoilValue(gmailItemsAtom);
    const isLoaded = useRecoilValue(gmailItemsLoadedAtom);

    useEffect(() => {
        if (gmailItems.length === 0) return;
        const count = gmailItems.filter((item) => !item.price.hide).length;
        const option = {
            duration: 0.5,
            separator: ',',
            decimal: '.',
        };
        const countUp = new CountUp('detected-invoices', count, option);
        setTimeout(() => countUp.start(), 0);
    }, [gmailItems]);

    return (
        <div className="stats shadow md:w-[20%]">
            <div className="stat place-items-center">
                <div className="stat-title">Invoices</div>
                <div
                    className={`stat-value text-primary ${
                        !isLoaded ? 'w-full bg-slate-300 rounded-full animate-pulse' : ''
                    }`}
                >
                    <span id="detected-invoices" />
                    <small className={!isLoaded ? 'invisible' : ''}>&nbsp;EA</small>
                </div>
            </div>
        </div>
    );
});
