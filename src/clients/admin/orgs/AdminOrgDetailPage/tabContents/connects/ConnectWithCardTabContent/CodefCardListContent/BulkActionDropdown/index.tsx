import React, {memo} from 'react';
import {MoreDropdown} from '^_components/MoreDropdown';
import {OrgAllCodefCardSyncButton} from './OrgAllCodefCardSyncButton';
import {ChevronDown, MoreHorizontal} from 'lucide-react';
import {FindAllCardAdminQueryDto} from '^models/CodefCard/type/find-all.card.query.dto';
import {CodefCardDto} from '^models/CodefCard/type/CodefCard.dto';
import {FetchBillingHistoriesItem} from '../ActionColumn/FetchBillingHistoriesItem';

interface BulkActionDropdownProps {
    isLoading: boolean;
    query: FindAllCardAdminQueryDto<CodefCardDto>;
    reload: () => any;
}

export const BulkActionDropdown = memo((props: BulkActionDropdownProps) => {
    const {isLoading, query, reload} = props;

    return (
        <div>
            <OrgAllCodefCardSyncButton isLoading={isLoading} reload={reload}>
                <MoreDropdown
                    className="flex items-center border-l border-gray-300 cursor-pointer hover:bg-gray-200 transition-all"
                    placement="bottom-end"
                    Trigger={() => (
                        <div tabIndex={0} className="px-1.5">
                            <ChevronDown />
                        </div>
                    )}
                >
                    <div className="card card-bordered card-compact rounded-md shadow-lg bg-white text-12 min-w-[100px]">
                        <FetchBillingHistoriesItem query={query} reload={reload} />
                        <MoreDropdown.MenuItem>구독 등록 (파서만 실행)</MoreDropdown.MenuItem>
                        <MoreDropdown.MenuItem>전체 최신화</MoreDropdown.MenuItem>
                    </div>
                </MoreDropdown>
            </OrgAllCodefCardSyncButton>
        </div>
    );
});
