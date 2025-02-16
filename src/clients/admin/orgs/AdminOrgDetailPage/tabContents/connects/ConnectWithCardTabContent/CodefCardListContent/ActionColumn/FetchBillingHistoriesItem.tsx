import React, {memo} from 'react';
import {useRecoilValue} from 'recoil';
import {toast} from 'react-hot-toast';
import {MoreDropdown} from '^clients/private/_components/MoreDropdown';
import {CodefCardDto} from '^models/CodefCard/type/CodefCard.dto';
import {useCodefCardSync} from '^models/CodefCard/hooks/useCodefCardSync';
import {codefCardApi} from '^models/CodefCard/api';
import {adminOrgDetail} from '^admin/orgs/AdminOrgDetailPage';
import {errorToast} from '^api/api';

interface FetchBillingHistoriesItemProps {
    codefCard: CodefCardDto;
    reload: () => Promise<any>;
}

export const FetchBillingHistoriesItem = memo((props: FetchBillingHistoriesItemProps) => {
    const {codefCard, reload} = props;
    const org = useRecoilValue(adminOrgDetail);
    const {isSyncRunning, setIsSyncRunning} = useCodefCardSync();

    const onClick = () => {
        if (!org) return;

        setIsSyncRunning(true);
        codefCardApi
            .patchHistories(org.id, codefCard.id)
            .then(() => toast.success('결제내역을 불러왔습니다.'))
            .catch(errorToast)
            .finally(() => {
                setIsSyncRunning(false);
                return reload();
            });
    };

    return (
        <MoreDropdown.MenuItem className={`${isSyncRunning ? 'pointer-events-none opacity-20' : ''}`} onClick={onClick}>
            결제내역 불러오기 (불러와서 저장만)
        </MoreDropdown.MenuItem>
    );
});
FetchBillingHistoriesItem.displayName = 'FetchBillingHistoriesItem';
