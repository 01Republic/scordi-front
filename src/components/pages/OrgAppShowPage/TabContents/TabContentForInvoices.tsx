import {memo} from 'react';
import {BillingHistoriesPanel} from './Invoices';
import {CreateHistoryInManualPanel} from './Invoices/CreateHistoryInManualPanel';
import {BillingHistoryTable} from './Invoices/BillingHistoryTable';
import {useCurrentApplication} from '^hooks/useApplications';

export const TabContentForInvoices = memo(() => {
    const {currentApplication: app} = useCurrentApplication();

    if (!app) return <></>;

    return (
        <>
            <BillingHistoryTable application={app} />
            {/*<div className="bs-container px-0">*/}
            {/*    <div className="grid grid-cols-12 gap-8">*/}
            {/*        /!* Left Col *!/*/}
            {/*        <div className="col-span-12 sm:col-span-8">*/}
            {/*            <BillingHistoriesPanel />*/}
            {/*        </div>*/}

            {/*        /!* Right Col *!/*/}
            {/*        <div className="col-span-12 sm:col-span-4">*/}
            {/*            <CreateHistoryInManualPanel />*/}
            {/*        </div>*/}
            {/*    </div>*/}
            {/*</div>*/}
        </>
    );
});
