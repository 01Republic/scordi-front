import React, {memo} from 'react';
import {useRecoilValue} from 'recoil';
import {toast} from 'react-hot-toast';
import {errorToast} from '^api/api';
import {MoreDropdown} from '^clients/private/_components/MoreDropdown';
import {confirm2, confirmed} from '^components/util/dialog';
import {adminOrgDetail} from '^admin/orgs/AdminOrgDetailPage';
import {CodefBankAccountDto} from '^models/CodefBankAccount/type/CodefBankAccount.dto';
import {codefBankAccountApi} from '^models/CodefBankAccount/api';
import {bankAccountApi} from '^models/BankAccount/api';

interface Props {
    codefAsset: CodefBankAccountDto;
    reload: () => Promise<any>;
}

export const RemoveAllOfCodefBankAccount = memo((props: Props) => {
    const {codefAsset, reload} = props;
    const org = useRecoilValue(adminOrgDetail);

    // 이 '코드에프 카드' 항목 삭제
    const remove = () => {
        if (!org) return;
        const removeConfirm = () => {
            return confirm2(
                '진짜 삭제할까요?',
                <div>
                    <p>
                        나중에 계정 연동이 최신화 되었을 때, DB에 없는 계좌가 감지되면 사용자에게 신규계좌가 발견된 것
                        처럼 보일 수 있습니다.
                    </p>
                    <p>그래도 삭제할까요?</p>
                </div>,
            );
        };

        return confirmed(removeConfirm())
            .then(() => codefBankAccountApi.destroy(org.id, codefAsset.id))
            .then(() => toast.success(`코드에프 카드 (${codefAsset.resAccountName}) 삭제완료`))
            .then(() => codefAsset.bankAccountId && disconnect('연결된 결제수단(계좌)도 함께 제거 할까요?'))
            .then(() => reload())
            .catch(errorToast);
    };

    // 연결된 결제수단(계좌) 제거
    const disconnect = (title?: string) => {
        if (!org || !codefAsset.bankAccountId) return;
        const bankAccountId = codefAsset.bankAccountId;

        return confirmed(confirm2(title || '진짜 삭제할까요?'))
            .then(() => bankAccountApi.destroy(org.id, bankAccountId))
            .then(() => toast.success('Successfully disconnected'))
            .then(() => reload())
            .catch(errorToast);
    };

    return <MoreDropdown.MenuItem onClick={() => remove()}>전부 삭제</MoreDropdown.MenuItem>;
});
