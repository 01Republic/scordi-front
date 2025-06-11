import React, {memo} from 'react';
import {useRecoilValue} from 'recoil';
import {toast} from 'react-hot-toast';
import {errorToast} from '^api/api';
import {confirm2, confirmed} from '^components/util/dialog';
import {MoreDropdown} from '^clients/private/_components/MoreDropdown';
import {adminOrgDetail} from '^admin/orgs/AdminOrgDetailPage';
import {CodefBankAccountDto} from '^models/CodefBankAccount/type/CodefBankAccount.dto';
import {bankAccountApi} from '^models/BankAccount/api';

interface Props {
    codefAsset: CodefBankAccountDto;
    reload: () => Promise<any>;
}

export const RemoveBankAccountItem = memo((props: Props) => {
    const {codefAsset, reload} = props;
    const org = useRecoilValue(adminOrgDetail);

    // 연결된 결제수단(카드) 제거
    const disconnect = (title?: string) => {
        if (!org || !codefAsset.bankAccountId) return;
        const id = codefAsset.bankAccountId;

        return confirmed(confirm2(title || '진짜 삭제할까요?'))
            .then(() => bankAccountApi.destroy(org.id, id))
            .then(() => toast.success('Successfully disconnected'))
            .then(() => reload())
            .catch(errorToast);
    };

    return <MoreDropdown.MenuItem onClick={() => disconnect()}>스코디에 등록된 계좌 삭제</MoreDropdown.MenuItem>;
});
