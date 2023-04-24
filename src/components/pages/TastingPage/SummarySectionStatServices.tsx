import React, {memo, useEffect, useState} from 'react';
import {useRecoilValue} from 'recoil';
import {CountUp} from 'countup.js';
import {gmailItemsAtom, gmailItemsLoadedAtom} from '^components/pages/TastingPage/pageAtoms';

export const SummarySectionStatServices = memo(() => {
    const gmailItems = useRecoilValue(gmailItemsAtom);
    const isLoaded = useRecoilValue(gmailItemsLoadedAtom);

    useEffect(() => {
        if (gmailItems.length === 0) return;
        const services: Record<string, number> = {};
        gmailItems.forEach((item) => {
            services[item.provider] ||= 0;
            services[item.provider] += 1;
        });

        const count = Object.keys(services).length;
        const option = {
            duration: 0.5,
            separator: ',',
            decimal: '.',
        };
        const countUp = new CountUp('detected-services', count, option);
        setTimeout(() => countUp.start(), 0);
    }, [gmailItems]);

    return (
        <div className="stats shadow md:w-[20%]">
            <div className="stat place-items-center">
                <div className="stat-title">Subscription</div>
                <div
                    className={`stat-value text-secondary ${
                        !isLoaded ? 'w-full bg-slate-300 rounded-full animate-pulse' : ''
                    }`}
                >
                    <span id="detected-services" />
                    <small className={!isLoaded ? 'invisible' : ''}>&nbsp;EA</small>
                </div>
            </div>
        </div>
    );
});
