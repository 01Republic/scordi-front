import {memo, useState} from 'react';
import {errorToast} from '^api/api';
import {CodefBillingHistoryDto, FindAllCodefBillingHistoryAdminQueryDto} from '^models/CodefBillingHistory/type';
import {codefBillingHistoriesAdminApi} from '^models/CodefBillingHistory/api';
import {Paginated} from '^types/utils/paginated.dto';
import {unitFormat} from '^utils/number';

interface FixTimeZoneButtonProps {
    query: FindAllCodefBillingHistoryAdminQueryDto;
    result: Paginated<CodefBillingHistoryDto>;
    reload: () => any;
}

export const FixCodefBillingHistoryTimeZoneButton = memo((props: FixTimeZoneButtonProps) => {
    const {query, result, reload} = props;
    const [isLoading, setIsLoading] = useState(false);

    const {pagination} = result;

    const onClick = () => {
        if (isLoading) return;
        setIsLoading(true);

        const confirmMsg = `${unitFormat(
            pagination.totalItemCount,
        )}개 결제내역의 시간을 보정합니다.\n시간이 다소 소요될 수 있어요.`;
        if (!confirm(confirmMsg)) return;

        codefBillingHistoriesAdminApi
            .fixTimeZone(query)
            .then(() => reload())
            .catch(errorToast)
            .finally(() => setIsLoading(false));
    };

    return (
        <button
            className={`btn btn-xs btn-white no-animation btn-animation ${isLoading ? 'loading' : ''}`}
            onClick={onClick}
            disabled={isLoading}
        >
            결제일시 시간보정
        </button>
    );
});
