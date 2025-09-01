import React, {memo} from 'react';
import {useRecoilState, useRecoilValue} from 'recoil';
import {toast} from 'react-hot-toast';
import {errorToast} from '^api/api';
import {confirm2, confirmed} from '^components/util/dialog';
import {MoreDropdown} from '^clients/private/_components/MoreDropdown';
import {adminOrgDetail} from '^admin/orgs/AdminOrgDetailPage';
import {codefBankAccountApi} from '^models/CodefBankAccount/api';
import {CodefBankAccountDto} from '^models/CodefBankAccount/type/CodefBankAccount.dto';
import {isSyncRunningAtom} from '^models/CodefCard/hooks/useCodefCardSyncQueue';

interface PatchSubscriptionsByCodefCardItemProps {
    codefAsset: CodefBankAccountDto;
    reload: () => Promise<any>;
}

export const PatchSubscriptionsByCodefBankAccount = memo((props: PatchSubscriptionsByCodefCardItemProps) => {
    const {codefAsset, reload} = props;
    const org = useRecoilValue(adminOrgDetail);
    const [isSyncRunning, setIsSyncRunning] = useRecoilState(isSyncRunningAtom);

    const onClick = () => {
        if (!org) return;

        const patchConfirm = () => {
            return confirm2('지금 파서를 실행할까요?');
        };

        return confirmed(patchConfirm())
            .then(() => setIsSyncRunning(true))
            .then(() => codefBankAccountApi.patchSubscriptions(org.id, codefAsset.id))
            .then(() => toast.success('실행완료'))
            .catch(errorToast)
            .finally(() => {
                setIsSyncRunning(false);
                return reload();
            });
    };

    return (
        <MoreDropdown.MenuItem className={`${isSyncRunning ? 'pointer-events-none opacity-20' : ''}`} onClick={onClick}>
            구독 등록 (파서만 실행)
        </MoreDropdown.MenuItem>
    );
});
PatchSubscriptionsByCodefBankAccount.displayName = 'PatchSubscriptionsByCodefCardItem';
