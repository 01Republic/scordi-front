import React, {memo} from 'react';
import {useRecoilState, useRecoilValue} from 'recoil';
import {MoreDropdown} from '^clients/private/_components/MoreDropdown';
import {adminOrgDetail} from '^admin/orgs/AdminOrgDetailPage';
import {useCodefCardSync} from '^models/CodefCard/hooks/useCodefCardSync';
import {CodefBankAccountDto} from '^models/CodefBankAccount/type/CodefBankAccount.dto';
import {codefBankAccountApi} from '^models/CodefBankAccount/api';
import {isSyncRunningAtom} from '^models/CodefCard/hooks/useCodefCardSyncQueue';
import {confirm2, confirmed} from '^components/util/dialog';
import {toast} from 'react-hot-toast';
import {errorToast} from '^api/api';

interface Props {
    codefAsset: CodefBankAccountDto;
    reload: () => Promise<any>;
}

export const PatchAllForCodefBankAccount = memo((props: Props) => {
    const {codefAsset, reload} = props;
    const org = useRecoilValue(adminOrgDetail);
    const [isSyncRunning, setIsSyncRunning] = useRecoilState(isSyncRunningAtom);

    const syncButtonClickHandler = () => {
        if (!org) return;

        const patchConfirm = () => {
            return confirm2('전체 최신화를 실행할까요?');
        };

        return confirmed(patchConfirm())
            .then(() => setIsSyncRunning(true))
            .then(() => codefBankAccountApi.histories(org.id, codefAsset.id, {sync: true}))
            .then(() => toast.success('실행완료'))
            .catch(errorToast)
            .finally(() => {
                setIsSyncRunning(false);
                return reload();
            });
    };

    return <MoreDropdown.MenuItem onClick={() => syncButtonClickHandler()}>전체 최신화</MoreDropdown.MenuItem>;
});
