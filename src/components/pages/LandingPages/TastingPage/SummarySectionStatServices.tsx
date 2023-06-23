import React, {memo, useEffect, useState} from 'react';
import {useRecoilValue} from 'recoil';
import {CountUp} from 'countup.js';
import {gmailItemsAtom, gmailItemsLoadedAtom} from './pageAtoms';
import {useTranslation} from 'next-i18next';

export const SummarySectionStatServices = memo(() => {
    const gmailItems = useRecoilValue(gmailItemsAtom);
    const isLoaded = useRecoilValue(gmailItemsLoadedAtom);
    const {t} = useTranslation('publicTasting');

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
        <div className="stats bg-[#fafafa] shadow-xl md:w-[20%]">
            <div className="stat place-items-center py-7">
                <div className="stat-title !text-black !opacity-100 font-semibold mb-3">
                    {t('summary_stat.services.label')}
                </div>
                <div
                    className={`stat-value !text-2xl text-secondary ${
                        !isLoaded ? 'w-full bg-slate-300 rounded-full animate-pulse' : ''
                    }`}
                >
                    <span id="detected-services" className="!text-4xl" />
                    <small className={!isLoaded ? 'invisible' : ''}>&nbsp;{t('summary_stat.services.unit')}</small>
                </div>
            </div>
        </div>
    );
});
