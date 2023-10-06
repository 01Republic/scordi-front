import React, {memo} from 'react';
import {InvoiceAccountDto} from '^types/invoiceAccount.type';
import {Avatar} from '^components/Avatar';
import {useSetRecoilState} from 'recoil';
import {selectedInvoiceAccountAtom} from '^v3/V3OrgHomePage/InvoiceAccountAddingButton/InvoiceAppListPanel';
import {zeroPad} from '^utils/dateTime';
import {syncInvoiceAccount} from '^api/invoiceAccount.api';
import {FiRefreshCw} from 'react-icons/fi';
import {toast} from 'react-toastify';
import {GmailAgentProgress, gmailAgentProgressAtom} from '^hooks/useGoogleAccessToken';
import {useModal} from '^v3/share/modals/useModal';
import {renewInvoiceAccountModal} from '^v3/V3OrgHomePage/RenewInvoiceAccountModal/atom';

interface InvoiceAccountItemProps {
    invoiceAccount: InvoiceAccountDto;
}

export const InvoiceAccountItem = memo((props: InvoiceAccountItemProps) => {
    const setSelectedInvoiceAccount = useSetRecoilState(selectedInvoiceAccountAtom);
    const setGmailAgentProgress = useSetRecoilState(gmailAgentProgressAtom);
    const {open: openRenewModal} = useModal(renewInvoiceAccountModal);
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

    const sync = () => {
        setGmailAgentProgress(GmailAgentProgress.started);
        syncInvoiceAccount(invoiceAccount.organizationId, invoiceAccount.id)
            .then((res) => {
                setGmailAgentProgress(GmailAgentProgress.no_running);
                window.location.reload();
            })
            .catch((err) => {
                toast.error('구글 로그인이 만료되었습니다.');
                openRenewModal();
            });
    };

    return (
        <div
            className="!w-auto gap-4 px-4 py-3 -mx-4 hover:bg-neutral btn-like no-selectable"
            onClick={() => setSelectedInvoiceAccount(invoiceAccount)}
        >
            <Avatar src={invoiceAccount.image || ''} className="w-9 h-9 outline outline-offset-1 outline-slate-100" />
            <div className="flex-1">
                <p className="text-sm font-extralight">{len}개의 서비스 알림을 받아요</p>
                <p className="text-[16px]">{invoiceAccount.email}</p>
            </div>
            <div>
                {/*<BiChevronRight size={22.5} />*/}
                <button className="btn btn-sm bg-slate-200 text-xs" data-created_at={createdAt}>
                    {since} ~
                </button>
            </div>
            <div>
                <button className="btn btn-sm btn-scordi text-xs" onClick={() => sync()}>
                    <FiRefreshCw size="10" />
                </button>
            </div>
        </div>
    );
});
