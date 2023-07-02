import React, {memo} from 'react';
import {useRecoilValue} from 'recoil';
import {gmailItemsLoadedAtom} from './pageAtoms';
import {useTranslation} from 'next-i18next';
import {useSummaryStatServices} from './hooks/useSummaryStatServices';

export const SummarySectionStatServices = memo(() => {
    const isLoaded = useRecoilValue(gmailItemsLoadedAtom);
    const {t} = useTranslation('publicTasting');
    useSummaryStatServices('detected-services');

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
