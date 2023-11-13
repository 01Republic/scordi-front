import React, {memo} from 'react';
import {InvoiceAccountDto} from '^types/invoiceAccount.type';
import {Avatar} from '^components/Avatar';
import {useSetRecoilState} from 'recoil';
import {selectedInvoiceAccountAtom} from '^v3/V3OrgHomePage/InvoiceAccountAddingButton/InvoiceAppListPanel';
import {zeroPad} from '^utils/dateTime';
import {FiRefreshCw} from 'react-icons/fi';
import {GmailAgentProgress, gmailAgentProgressAtom} from '^hooks/useGoogleAccessToken';
import {useModal} from '^v3/share/modals/useModal';
import {renewInvoiceAccountModal} from '^v3/V3OrgHomePage/RenewInvoiceAccountModal/atom';
import {useRouter} from 'next/router';
import {V3OrgInvoiceAccountShowPageRoute} from '^pages/v3/orgs/[orgId]/invoiceAccounts/[invoiceAccountId]';
import {useToast} from '^hooks/useToast';
import {invoiceAccountApi} from '^api/invoiceAccount.api';

interface InvoiceAccountItemProps {
    invoiceAccount: InvoiceAccountDto;
}

export const InvoiceAccountItem = memo((props: InvoiceAccountItemProps) => {
    const router = useRouter();
    const setSelectedInvoiceAccount = useSetRecoilState(selectedInvoiceAccountAtom);
    const setGmailAgentProgress = useSetRecoilState(gmailAgentProgressAtom);
    const {open: openRenewModal} = useModal(renewInvoiceAccountModal);
    const {invoiceAccount} = props;
    const appNames: string[] = [];
    const {toast} = useToast();

    const subscriptions = invoiceAccount.subscriptions || [];
    const len = subscriptions.filter((s) => s.isActive).length;
    subscriptions.forEach((subscription, i) => {
        if (i < 2) {
            appNames.push(subscription.product.name());
        }
        if (i === 2) appNames.push(`${subscription.product.name()} ... ${len} apps`);
        if (i > 2) return;
    });
    const createdAt = new Date(invoiceAccount.createdAt);
    const since = [createdAt.getFullYear() - 2000, createdAt.getMonth() + 1]
        .map((e) => zeroPad(e.toString()))
        .join('.');

    const sync = () => {
        setGmailAgentProgress(GmailAgentProgress.started);
        invoiceAccountApi
            .sync(invoiceAccount.organizationId, invoiceAccount.id)
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
            onClick={() =>
                router.push(V3OrgInvoiceAccountShowPageRoute.path(invoiceAccount.organizationId, invoiceAccount.id))
            }
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
