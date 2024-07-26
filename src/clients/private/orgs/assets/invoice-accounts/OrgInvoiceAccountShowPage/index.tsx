import {memo, useState} from 'react';
import {useRecoilValue} from 'recoil';
import {orgIdParamState} from '^atoms/common';
import {ShowPage} from '^clients/private/_components/rest-pages/ShowPage';
import {InvoiceAccountProfilePanel} from '^clients/private/orgs/assets/invoice-accounts/OrgInvoiceAccountShowPage/InvoiceAccountProfilePanel';

export const OrgInvoiceAccountShowPage = memo(function OrgInvoiceAccountShowPage() {
    const orgId = useRecoilValue(orgIdParamState);
    const [activeTabIndex, setActiveTabIndex] = useState(0);

    return (
        <ShowPage breadcrumb={['자산']}>
            <header className="flex items-center justify-between pt-8 pb-4">
                <div className="flex-auto">
                    <InvoiceAccountProfilePanel />
                </div>
            </header>

            <main className="pt-4">
                <div className="flex items-center justify-between border-b border-gray-300"></div>
            </main>
        </ShowPage>
    );
});
