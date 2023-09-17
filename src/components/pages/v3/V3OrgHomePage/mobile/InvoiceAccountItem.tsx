import React, {memo} from 'react';
import {InvoiceAccountDto} from '^types/invoiceAccount.type';
import {Avatar} from '^components/Avatar';
import {useSetRecoilState} from 'recoil';
import {selectedInvoiceAccountAtom} from '^v3/V3OrgHomePage/InvoiceAccountAddingButton/InvoiceAppListPanel';
import {zeroPad} from '^utils/dateTime';

interface InvoiceAccountItemProps {
    invoiceAccount: InvoiceAccountDto;
}

export const InvoiceAccountItem = memo((props: InvoiceAccountItemProps) => {
    const setSelectedInvoiceAccount = useSetRecoilState(selectedInvoiceAccountAtom);
    const {invoiceAccount} = props;
    const appNames: string[] = [];

    const len = invoiceAccount.invoiceApps.length;
    invoiceAccount.invoiceApps.forEach((app, i) => {
        if (i < 2) {
            appNames.push(app.product.nameEn);
        }
        if (i === 2) appNames.push(`${app.product.nameEn} ... ${len} apps`);
        if (i > 2) return;
    });
    const createdAt = new Date(invoiceAccount.createdAt);
    const since = [createdAt.getFullYear() - 2000, createdAt.getMonth() + 1]
        .map((e) => zeroPad(e.toString()))
        .join('.');

    return (
        <div
            className="flex items-center gap-4 px-3 py-2.5 -mx-3 bg-base-100 text-gray-700 cursor-pointer hover:bg-neutral"
            onClick={() => setSelectedInvoiceAccount(invoiceAccount)}
        >
            <Avatar src={invoiceAccount.image || ''} className="w-8 h-8 outline outline-offset-1 outline-slate-100" />
            <div className="flex-1">
                <p className="text-xs font-extralight">{len}개의 서비스 알림을 받아요</p>
                <p className="text-sm">{invoiceAccount.email}</p>
            </div>
            <div>
                {/*<BiChevronRight size={22.5} />*/}
                <button className="btn btn-sm bg-slate-200 text-xs" data-created_at={createdAt}>
                    {since} ~
                </button>
            </div>
        </div>
    );
});
