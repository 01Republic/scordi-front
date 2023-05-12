import React, {memo} from 'react';
import {useRecoilValue} from 'recoil';
import {gmailProfileAtom} from './pageAtoms';
import {SummarySectionStatInvoices} from './SummarySectionStatInvoices';
import {SummarySectionStatServices} from './SummarySectionStatServices';
import {SummarySectionStatBalance} from './SummarySectionStatBalance';

export const SummarySection = memo(() => {
    const gmailProfile = useRecoilValue(gmailProfileAtom);

    return (
        <div id="tasting-handler--summary-section">
            <div className="mb-6">
                {gmailProfile ? <h2>Hi, {gmailProfile.name}</h2> : <h2>Gotcha!</h2>}
                <p>{gmailProfile?.email}</p>
            </div>

            <div className="mb-6 text-left">
                <div className="flex justify-center gap-6">
                    <SummarySectionStatServices />
                    <SummarySectionStatInvoices />
                    <SummarySectionStatBalance />
                </div>
            </div>
        </div>
    );
});

export const SummarySection2 = memo(() => {
    return (
        <div id="tasting-handler--summary-section">
            <div className="mb-6 text-left">
                <div className="flex justify-center gap-6">
                    <SummarySectionStatServices />
                    <SummarySectionStatInvoices />
                    <SummarySectionStatBalance />
                </div>
            </div>
        </div>
    );
});
