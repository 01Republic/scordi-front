import React, {memo, useEffect, useState} from 'react';
import {useRecoilValue} from 'recoil';
import {gmailItemsAtom, gmailItemsLoadedAtom} from './pageAtoms';
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
        <div className="stats bg-[#fafafa] shadow-xl md:w-[20%]">
            <div className="stat place-items-center py-7">
                <div className="stat-title !text-black !opacity-100 font-semibold mb-3">결제 영수증 메일</div>
                <div
                    className={`stat-value !text-2xl text-primary ${
                        !isLoaded ? 'w-full bg-slate-300 rounded-full animate-pulse' : ''
                    }`}
                >
                    <span id="detected-invoices" className="!text-4xl" />
                    <small className={!isLoaded ? 'invisible' : ''}>&nbsp;건</small>
                </div>
            </div>
        </div>
    );
});
