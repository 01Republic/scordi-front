import React, {memo} from 'react';
import {CodefCardDto} from '^models/CodefCard/type/CodefCard.dto';
import {useRecoilValue} from 'recoil';
import {adminOrgDetail} from '^admin/orgs/AdminOrgDetailPage';
import {useCodefCardSync} from '^models/CodefCard/hooks/useCodefCardSync';
import {MoreDropdown} from '^clients/private/_components/MoreDropdown';
import {codefCardApi} from '^models/CodefCard/api';
import {toast} from 'react-hot-toast';
import {errorToast} from '^api/api';
import {confirm2, confirmed} from '^components/util/dialog';

interface PatchSubscriptionsByCodefCardItemProps {
    codefCard: CodefCardDto;
    reload: () => Promise<any>;
}

export const PatchSubscriptionsByCodefCardItem = memo((props: PatchSubscriptionsByCodefCardItemProps) => {
    const {codefCard, reload} = props;
    const org = useRecoilValue(adminOrgDetail);
    const {isSyncRunning, setIsSyncRunning} = useCodefCardSync();

    const onClick = () => {
        if (!org) return;

        const patchConfirm = () => {
            return confirm2('지금 파서를 실행할까요?');
        };

        return confirmed(patchConfirm())
            .then(() => setIsSyncRunning(true))
            .then(() => codefCardApi.patchSubscriptions(org.id, codefCard.id))
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
PatchSubscriptionsByCodefCardItem.displayName = 'PatchSubscriptionsByCodefCardItem';
