import {memo} from 'react';
import {useRouter} from 'next/router';
import {toast} from 'react-hot-toast';
import {errorToast} from '^api/api';
import {confirm2} from '^components/util/dialog';
import {useCurrentBankAccount} from '../../atom';
import {bankAccountApi} from '^models/BankAccount/api';
import {OrgBankAccountListPageRoute} from '^pages/orgs/[id]/bankAccounts';
import {MoreDropdownMenuItem} from '^clients/private/_components/rest-pages/ShowPage/MoreDropdown';

export const DeleteCreditCardItem = memo(function DeleteCreditCardButton() {
    const {currentBankAccount} = useCurrentBankAccount();
    const router = useRouter();

    const onClick = async () => {
        if (!currentBankAccount) return;
        const {id, organizationId: orgId} = currentBankAccount;

        confirmDestroy()
            .then(() => bankAccountApi.destroy(orgId, id))
            .then(() => toast.success('삭제 성공'))
            .then(() => router.replace(OrgBankAccountListPageRoute.path(orgId)))
            .catch(errorToast);
    };

    if (!currentBankAccount) return <></>;

    return (
        <MoreDropdownMenuItem onClick={onClick} theme="danger">
            삭제하기
        </MoreDropdownMenuItem>
    );
});

function confirmDestroy() {
    return confirm2(
        '정말 삭제할까요?',
        '이 카드에 포함된 결제내역도 모두 삭제되며,\n이 작업은 복구할 수 없습니다.\n그래도 삭제할까요?',
        'warning',
    ).then((r) => {
        if (!r.isConfirmed) throw new Error('삭제를 취소했어요.');
    });
}
