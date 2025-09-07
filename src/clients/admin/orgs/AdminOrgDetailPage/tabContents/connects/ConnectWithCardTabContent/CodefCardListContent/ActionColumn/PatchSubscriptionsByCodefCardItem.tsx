import React, {memo} from 'react';
import {CodefCardDto} from '^models/CodefCard/type/CodefCard.dto';
import {useCodefCardSync} from '^models/CodefCard/hooks/useCodefCardSync';
import {MoreDropdown} from '^clients/private/_components/MoreDropdown';
import {codefCardAdminApi, codefCardApi} from '^models/CodefCard/api';
import {toast} from 'react-hot-toast';
import {errorToast} from '^api/api';
import {confirm2, confirmed} from '^components/util/dialog';
import {useIdParam} from '^atoms/common';
import {FindAllCardAdminQueryDto} from '^models/CodefCard/type/find-all.card.query.dto';

interface PatchSubscriptionsByCodefCardItemProps {
    codefCard?: CodefCardDto;
    query?: FindAllCardAdminQueryDto<CodefCardDto>;
    reload: () => Promise<any>;
}

export const PatchSubscriptionsByCodefCardItem = memo((props: PatchSubscriptionsByCodefCardItemProps) => {
    const {codefCard, query = {}, reload} = props;
    const orgId = useIdParam('id');
    const {isSyncRunning, setIsSyncRunning} = useCodefCardSync();

    const onClick = () => {
        if (isSyncRunning) return;
        const patchConfirm = () => {
            return confirm2('지금 파서를 실행할까요?');
        };

        const request = () => {
            return codefCard
                ? codefCardApi.patchSubscriptions(orgId, codefCard.id)
                : codefCardAdminApi.patchSubscriptions({
                      ...query,
                      organizationId: orgId,
                  });
        };

        return confirmed(patchConfirm())
            .then(() => setIsSyncRunning(true))
            .then(() => request())
            .then(() => toast.success('실행완료'))
            .then(() => reload())
            .catch(errorToast)
            .finally(() => setIsSyncRunning(false));
    };

    return (
        <MoreDropdown.MenuItem className={`${isSyncRunning ? 'pointer-events-none opacity-20' : ''}`} onClick={onClick}>
            구독 등록 (파서만 실행)
        </MoreDropdown.MenuItem>
    );
});
PatchSubscriptionsByCodefCardItem.displayName = 'PatchSubscriptionsByCodefCardItem';
