import {memo} from 'react';
import {useRouter} from 'next/router';
import {toast} from 'react-hot-toast';
import {errorToast} from '^api/api';
import {confirm2} from '^components/util/dialog';
import {MoreDropdownMenuItem} from '^clients/private/_components/rest-pages/ShowPage/MoreDropdown';
import {invoiceAccountApi} from '^models/InvoiceAccount/api';
import {OrgInvoiceAccountListPageRoute} from '^pages/orgs/[id]/invoiceAccounts';
import {useCurrentInvoiceAccount} from '../../atom';

export const DeleteInvoiceAccountItem = memo(function DeleteInvoiceAccountItem() {
    const {currentInvoiceAccount} = useCurrentInvoiceAccount();
    const router = useRouter();

    const onClick = () => {
        if (!currentInvoiceAccount) return;
        const {id, organizationId: orgId} = currentInvoiceAccount;

        confirmDestroy()
            .then(() => invoiceAccountApi.destroy(orgId, id))
            .then(() => toast.success(`${currentInvoiceAccount.email}\n청구서 메일을 삭제했어요.`))
            .then(() => router.replace(OrgInvoiceAccountListPageRoute.path(orgId)))
            .catch(errorToast);
    };

    return (
        <MoreDropdownMenuItem onClick={onClick} theme="danger">
            삭제하기
        </MoreDropdownMenuItem>
    );
});

function confirmDestroy() {
    return confirm2(
        '청구서 메일을 삭제할까요?1',
        <p>
            이 작업은 취소할 수 없습니다.
            <br />
            <b>워크스페이스 전체</b>에서 삭제됩니다. <br />
            그래도 삭제하시겠어요?
        </p>,
    ).then((r) => {
        if (!r.isConfirmed) throw new Error('삭제를 취소했어요.');
    });
}
