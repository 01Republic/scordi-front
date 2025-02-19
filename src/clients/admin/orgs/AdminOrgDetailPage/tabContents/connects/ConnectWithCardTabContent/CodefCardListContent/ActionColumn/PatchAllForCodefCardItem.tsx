import React, {memo} from 'react';
import {CodefCardDto} from '^models/CodefCard/type/CodefCard.dto';
import {useRecoilValue} from 'recoil';
import {adminOrgDetail} from '^admin/orgs/AdminOrgDetailPage';
import {useCodefCardSync} from '^models/CodefCard/hooks/useCodefCardSync';
import {MoreDropdown} from '^clients/private/_components/MoreDropdown';

interface PatchAllForCodefCardItemProps {
    codefCard: CodefCardDto;
    reload: () => Promise<any>;
}

export const PatchAllForCodefCardItem = memo((props: PatchAllForCodefCardItemProps) => {
    const {codefCard, reload} = props;
    const org = useRecoilValue(adminOrgDetail);
    const {syncCard, isSyncRunning} = useCodefCardSync();

    const syncButtonClickHandler = () => {
        if (!org) return;
        const run = () => {
            syncCard(org.id, codefCard).finally(() => reload());
        };

        const runningRows = document.querySelectorAll('.CodefCardItem-running');
        if (runningRows.length <= 2) {
            run();
        } else {
        }
    };

    return <MoreDropdown.MenuItem onClick={() => syncButtonClickHandler()}>전체 최신화</MoreDropdown.MenuItem>;
});
PatchAllForCodefCardItem.displayName = 'PatchAllForCodefCardItem';
