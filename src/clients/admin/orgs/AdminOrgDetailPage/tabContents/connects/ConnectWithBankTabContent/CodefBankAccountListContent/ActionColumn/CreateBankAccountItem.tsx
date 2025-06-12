import React, {memo} from 'react';
import {useRecoilValue} from 'recoil';
import {toast} from 'react-hot-toast';
import {errorToast} from '^api/api';
import {adminOrgDetail} from '^admin/orgs/AdminOrgDetailPage';
import {MoreDropdown} from '^clients/private/_components/MoreDropdown';
import {useCodefCardSync} from '^models/CodefCard/hooks/useCodefCardSync';
import {codefCardApi} from '^models/CodefCard/api';
import {CodefBankAccountDto} from '^models/CodefBankAccount/type/CodefBankAccount.dto';

interface Props {
    codefAsset: CodefBankAccountDto;
    reload: () => Promise<any>;
}

export const CreateBankAccountItem = memo((props: Props) => {
    const {codefAsset, reload} = props;
    const org = useRecoilValue(adminOrgDetail);
    const {isSyncRunning, setIsSyncRunning} = useCodefCardSync();

    const onClick = () => {
        if (!org) return;

        setIsSyncRunning(true);
        codefCardApi
            .createCreditCard(org.id, codefAsset.id)
            .then(() => toast.success('스코디에 계좌를 등록했어요'))
            .catch(errorToast)
            .finally(() => {
                setIsSyncRunning(false);
                return reload();
            });
    };

    return (
        <MoreDropdown.MenuItem className={`${isSyncRunning ? 'pointer-events-none opacity-20' : ''}`} onClick={onClick}>
            스코디에 계좌 등록
        </MoreDropdown.MenuItem>
    );
});
