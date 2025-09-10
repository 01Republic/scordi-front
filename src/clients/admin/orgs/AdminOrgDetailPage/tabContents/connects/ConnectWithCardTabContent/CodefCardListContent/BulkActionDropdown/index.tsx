import React, {memo} from 'react';
import {MoreDropdown} from '^_components/MoreDropdown';
import {OrgAllCodefCardSyncButton} from './OrgAllCodefCardSyncButton';
import {ChevronDown, MoreHorizontal} from 'lucide-react';
import {FindAllCardAdminQueryDto} from '^models/CodefCard/type/find-all.card.query.dto';
import {CodefCardDto} from '^models/CodefCard/type/CodefCard.dto';
import {FetchBillingHistoriesItem} from '../ActionColumn/FetchBillingHistoriesItem';
import {PatchSubscriptionsByCodefCardItem} from '../ActionColumn/PatchSubscriptionsByCodefCardItem';
import {PatchAllForCodefCardItem} from '../ActionColumn/PatchAllForCodefCardItem';
import {eventCut} from '^utils/event';
import {unitFormat} from '^utils/number';
import {PaginationMetaData} from '^types/utils/paginated.dto';

interface BulkActionDropdownProps {
    isLoading: boolean;
    pagination: PaginationMetaData;
    query: FindAllCardAdminQueryDto<CodefCardDto>;
    reload: () => any;
}

export const BulkActionDropdown = memo((props: BulkActionDropdownProps) => {
    const {isLoading, pagination, query, reload} = props;

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
                        <MoreDropdown.MenuItem
                            onClick={eventCut}
                            className="pointer-events-none text-11 bg-black text-white font-semibold flex items-center justify-between"
                        >
                            <span>실행 대상:</span>

                            <span>
                                {unitFormat(pagination.currentPage, '페이지')} {unitFormat(pagination.currentItemCount)}
                            </span>
                        </MoreDropdown.MenuItem>
                        <FetchBillingHistoriesItem query={query} reload={reload} />
                        <PatchSubscriptionsByCodefCardItem query={query} reload={reload} />
                        <PatchAllForCodefCardItem query={query} reload={reload} />
                    </div>
                </MoreDropdown>
            </OrgAllCodefCardSyncButton>
        </div>
    );
});
