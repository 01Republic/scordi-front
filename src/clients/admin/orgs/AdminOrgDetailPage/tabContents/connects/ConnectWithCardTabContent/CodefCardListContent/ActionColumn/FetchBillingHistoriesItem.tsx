import React, {memo} from 'react';
import {useRecoilValue} from 'recoil';
import {toast} from 'react-hot-toast';
import {MoreDropdown} from '^clients/private/_components/MoreDropdown';
import {codefCardAdminApi, codefCardApi} from '^models/CodefCard/api';
import {CodefCardDto} from '^models/CodefCard/type/CodefCard.dto';
import {RangeQueryDto} from '^models/CodefCard/type/range.query.dto';
import {useCodefCardSync} from '^models/CodefCard/hooks/useCodefCardSync';
import {errorToast} from '^api/api';
import {swalHTML} from '^components/util/dialog';
import {RangeDateSwalForm} from './RangeDateSwalForm';
import {useIdParam} from '^atoms/common';
import {FindAllCardAdminQueryDto} from '^models/CodefCard/type/find-all.card.query.dto';

interface FetchBillingHistoriesItemProps {
    codefCard?: CodefCardDto;
    query?: FindAllCardAdminQueryDto<CodefCardDto>;
    reload: () => Promise<any>;
}

export const FetchBillingHistoriesItem = memo((props: FetchBillingHistoriesItemProps) => {
    const {codefCard, query = {}, reload} = props;
    const orgId = useIdParam('id');
    const {isSyncRunning, setIsSyncRunning} = useCodefCardSync();

    const onSubmit = async (dto: RangeQueryDto) => {
        const request = () => {
            return codefCard
                ? codefCardApi.patchHistories(orgId, codefCard.id, dto)
                : codefCardAdminApi.patchHistories({
                      ...query,
                      organizationId: orgId,
                      startDate: dto.startDate,
                      endDate: dto.endDate,
                  });
        };

        setIsSyncRunning(true);
        return request()
            .then(() => toast.success('결제내역을 불러왔습니다.'))
            .then(() => reload())
            .catch(errorToast)
            .finally(() => setIsSyncRunning(false));
    };

    const onClick = () => swalHTML(<RangeDateSwalForm codefCard={codefCard} onSubmit={onSubmit} />);

    return (
        <MoreDropdown.MenuItem className={`${isSyncRunning ? 'pointer-events-none opacity-20' : ''}`} onClick={onClick}>
            결제내역 불러오기 (불러와서 저장만)
        </MoreDropdown.MenuItem>
    );
});
FetchBillingHistoriesItem.displayName = 'FetchBillingHistoriesItem';
