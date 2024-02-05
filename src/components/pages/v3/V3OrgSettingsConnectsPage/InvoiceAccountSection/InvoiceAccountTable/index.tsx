import {memo} from 'react';
import {useInvoiceAccounts} from '^models/InvoiceAccount/hook';
import {InvoiceAccountTableRow} from '^v3/V3OrgSettingsConnectsPage/InvoiceAccountSection/InvoiceAccountTable/InvoiceAccountTableRow';

export const InvoiceAccountTable = memo(() => {
    const {result} = useInvoiceAccounts();
    const invoiceAccounts = result.items;

    return (
        <div className="card bg-white">
            <div className="overflow-x-auto w-full">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th className="bg-base-100">이메일</th>
                            <th className="bg-base-100"></th>
                        </tr>
                    </thead>

                    <tbody>
                        {invoiceAccounts.map((invoiceAccount, i) => (
                            <InvoiceAccountTableRow key={i} invoiceAccount={invoiceAccount} />
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
});
