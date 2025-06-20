import React, {memo} from 'react';
import {useRecoilValue} from 'recoil';
import {MoreDropdown} from '^clients/private/_components/MoreDropdown';
import {adminOrgDetail} from '^admin/orgs/AdminOrgDetailPage';
import {useCodefCardSync} from '^models/CodefCard/hooks/useCodefCardSync';
import {CodefBankAccountDto} from '^models/CodefBankAccount/type/CodefBankAccount.dto';
import {codefBankAccountApi} from '^models/CodefBankAccount/api';

interface Props {
    codefAsset: CodefBankAccountDto;
    reload: () => Promise<any>;
}

export const PatchAllForCodefBankAccount = memo((props: Props) => {
    const {codefAsset, reload} = props;
    const org = useRecoilValue(adminOrgDetail);
    const {syncCard, isSyncRunning} = useCodefCardSync();

    const syncButtonClickHandler = () => {
        if (!org) return;
        const run = () => {
            codefBankAccountApi.histories(org.id, codefAsset.id, {sync: true}).finally(() => reload());
        };

        const runningRows = document.querySelectorAll('.CodefCardItem-running');
        if (runningRows.length <= 2) {
            run();
        } else {
        }
    };

    return <MoreDropdown.MenuItem onClick={() => syncButtonClickHandler()}>전체 최신화</MoreDropdown.MenuItem>;
});
