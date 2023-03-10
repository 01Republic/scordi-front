import {memo} from 'react';
import {useApplication} from '^hooks/useApplications';
import {useRouter} from 'next/router';
import {BillingHistoriesPanel} from './Invoices';
import {CreateHistoryInManualPanel} from './Invoices/CreateHistoryInManualPanel';

export const TabContentForInvoices = memo(() => {
    const router = useRouter();
    const application = useApplication();

    return (
        <div className="bs-container">
            <div className="bs-row gap-8">
                {/* Left Col */}
                <div className="bs-col-12 sm:bs-col px-0">
                    <BillingHistoriesPanel />
                </div>

                {/* Right Col */}
                <div className="bs-col-12 sm:bs-col-4 px-0">
                    <CreateHistoryInManualPanel />
                </div>
            </div>
        </div>
    );
});
