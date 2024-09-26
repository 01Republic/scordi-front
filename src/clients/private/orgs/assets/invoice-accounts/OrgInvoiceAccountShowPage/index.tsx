import {memo, useState} from 'react';
import {useRecoilValue} from 'recoil';
import {orgIdParamState} from '^atoms/common';
import {ShowPage} from '^clients/private/_components/rest-pages/ShowPage';
import {InvoiceAccountProfilePanel} from '^clients/private/orgs/assets/invoice-accounts/OrgInvoiceAccountShowPage/InvoiceAccountProfilePanel';
import {useCurrentInvoiceAccount} from '^clients/private/orgs/assets/invoice-accounts/OrgInvoiceAccountShowPage/atom';
import {OrgInvoiceAccountListPageRoute} from '^pages/orgs/[id]/invoiceAccounts';
import {InvoiceAccountActionPanel} from '^clients/private/orgs/assets/invoice-accounts/OrgInvoiceAccountShowPage/InvoiceAccountActionPanel';

export const OrgInvoiceAccountShowPage = memo(function OrgInvoiceAccountShowPage() {
    const orgId = useRecoilValue(orgIdParamState);
    const [activeTabIndex, setActiveTabIndex] = useState(0);
    const {currentInvoiceAccount} = useCurrentInvoiceAccount();

    console.log('currentInvoiceAccount', currentInvoiceAccount);

    return (
        <ShowPage
            breadcrumb={[
                '자산',
                {text: '청구서 수신 메일', href: OrgInvoiceAccountListPageRoute.path(orgId)},
                {text: `${currentInvoiceAccount?.title}`, active: true},
            ]}
        >
            <header className="flex items-center justify-between pt-8 pb-4">
                <div className="flex-auto">
                    <InvoiceAccountProfilePanel />
                </div>

                <InvoiceAccountActionPanel />
            </header>

            <main className="pt-4">
                <div className="flex items-center justify-between border-b border-gray-300"></div>
            </main>
        </ShowPage>
    );
});
