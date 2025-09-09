import React, {memo} from 'react';
import {CodefCardDto} from '^models/CodefCard/type/CodefCard.dto';
import {useRecoilValue} from 'recoil';
import {adminOrgDetail} from '^admin/orgs/AdminOrgDetailPage';
import {useCodefCardSync} from '^models/CodefCard/hooks/useCodefCardSync';
import {MoreDropdown} from '^clients/private/_components/MoreDropdown';
import {useIdParam} from '^atoms/common';
import {FindAllCardAdminQueryDto} from '^models/CodefCard/type/find-all.card.query.dto';
import {confirm2, confirmed} from '^components/util/dialog';
import {errorToast} from '^api/api';
import {codefCardAdminApi} from '^models/CodefCard/api';

interface PatchAllForCodefCardItemProps {
    codefCard?: CodefCardDto;
    query?: FindAllCardAdminQueryDto<CodefCardDto>;
    reload: () => Promise<any>;
}

export const PatchAllForCodefCardItem = memo((props: PatchAllForCodefCardItemProps) => {
    const {codefCard, query = {}, reload} = props;
    const orgId = useIdParam('id');
    const {syncCard, isSyncRunning, setIsSyncRunning} = useCodefCardSync();

    const onClick = () => {
        if (isSyncRunning) return;
        const patchConfirm = () => {
            return confirm2('지금 전체최신화를 실행할까요?');
        };

        const request = () => {
            return codefCard
                ? syncCard(orgId, codefCard, true)
                : codefCardAdminApi.syncAll({
                      ...query,
                      organizationId: orgId,
                  });
        };

        return confirmed(patchConfirm())
            .then(() => request())
            .then(() => reload())
            .catch(errorToast)
            .finally(() => setIsSyncRunning(false));
    };

    return <MoreDropdown.MenuItem onClick={onClick}>전체 최신화</MoreDropdown.MenuItem>;
});
PatchAllForCodefCardItem.displayName = 'PatchAllForCodefCardItem';
