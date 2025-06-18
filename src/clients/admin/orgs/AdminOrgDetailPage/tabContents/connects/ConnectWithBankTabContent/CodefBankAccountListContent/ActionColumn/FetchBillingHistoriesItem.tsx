import React, {memo} from 'react';
import {useRecoilValue} from 'recoil';
import {toast} from 'react-hot-toast';
import {adminOrgDetail} from '^admin/orgs/AdminOrgDetailPage';
import {errorToast} from '^api/api';
import {swalHTML} from '^components/util/dialog';
import {MoreDropdown} from '^clients/private/_components/MoreDropdown';
import {codefBankAccountApi} from '^models/CodefBankAccount/api';
import {CodefBankAccountDto} from '^models/CodefBankAccount/type/CodefBankAccount.dto';
import {PatchHistoriesQueryDto, RangeQueryDto} from '^models/CodefCard/type/range.query.dto';
import {useCodefCardSync} from '^models/CodefCard/hooks/useCodefCardSync';
import {RangeDateSwalForm} from './RangeDateSwalForm';

interface FetchBillingHistoriesItemProps {
    codefAsset: CodefBankAccountDto;
    reload: () => Promise<any>;
}

export const FetchBillingHistoriesItem = memo((props: FetchBillingHistoriesItemProps) => {
    const {codefAsset, reload} = props;
    const org = useRecoilValue(adminOrgDetail);
    const {isSyncRunning, setIsSyncRunning} = useCodefCardSync();

    const onSubmit = async (dto: PatchHistoriesQueryDto) => {
        if (!org) return;

        setIsSyncRunning(true);
        return codefBankAccountApi
            .patchHistories(org.id, codefAsset.id, dto)
            .then(() => toast.success('결제내역을 불러왔습니다.'))
            .catch(errorToast)
            .finally(() => {
                setIsSyncRunning(false);
                return reload();
            });
    };

    const onClick = () => swalHTML(<RangeDateSwalForm {...codefAsset.nextFetchHistoriesRange()} onSubmit={onSubmit} />);

    return (
        <MoreDropdown.MenuItem className={`${isSyncRunning ? 'pointer-events-none opacity-20' : ''}`} onClick={onClick}>
            결제내역 불러오기 (불러와서 저장만)
        </MoreDropdown.MenuItem>
    );
});
FetchBillingHistoriesItem.displayName = 'FetchBillingHistoriesItem';
