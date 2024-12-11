import {memo} from 'react';
import {FaTrashCan} from 'react-icons/fa6';
import {useCurrentInvoiceAccount} from '^clients/private/orgs/assets/invoice-accounts/OrgInvoiceAccountShowPage/atom';
import {invoiceAccountApi} from '^models/InvoiceAccount/api';
import {confirm2} from '^components/util/dialog';
import {toast} from 'react-hot-toast';
import {useRouter} from 'next/router';
import {OrgInvoiceAccountListPageRoute} from '^pages/orgs/[id]/invoiceAccounts';

export const DeleteInvoiceAccountButton = memo(function DeleteInvoiceAccountButton() {
    const router = useRouter();
    const {currentInvoiceAccount} = useCurrentInvoiceAccount();

    const onClick = () => {
        if (!currentInvoiceAccount) return;
        const {organizationId, id} = currentInvoiceAccount;

        confirm2(
            '청구서 메일을 삭제할까요?',
            <p>
                이 작업은 취소할 수 없습니다.
                <br />
                <b>워크스페이스 전체</b>에서 삭제됩니다. <br />
                그래도 삭제하시겠어요?
            </p>,
        )
            .then((r) => {
                if (!r.isConfirmed) throw new Error('삭제를 취소했어요.');
            })
            .then(() => invoiceAccountApi.destroy(organizationId, id))
            .then(() => toast.success(`${currentInvoiceAccount.email} 청구서 메일을 삭제했어요.`))
            .then(() => router.replace(OrgInvoiceAccountListPageRoute.path(organizationId)))
            .catch((e) => console.log(e.message));
    };

    return (
        <button
            className="btn btn-square bg-white hover:bg-white border-gray-300 hover:border-red-400 text-red-400 hover:text-red-500"
            onClick={onClick}
        >
            <FaTrashCan />
        </button>
    );
});
