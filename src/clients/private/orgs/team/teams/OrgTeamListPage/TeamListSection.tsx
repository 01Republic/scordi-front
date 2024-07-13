import {memo, useRef} from 'react';
import {LoadableBox} from '^components/util/loading';
import {Paginated, PaginationMetaData} from '^types/utils/paginated.dto';
import {debounce} from 'lodash';
import {TeamDto} from '^models/Team/type';
import {TeamListItem} from './TeamListItem';
import {LoadMoreButton} from './LoadMoreButton';

interface TeamListSectionProps {
    result?: Paginated<TeamDto>;
    isLoading?: boolean;
    movePage?: (page: number, append?: boolean) => Promise<any>;
}

export const TeamListSection = memo((props: TeamListSectionProps) => {
    const {isLoading = false, result, movePage} = props;
    const ref = useRef<HTMLDivElement>(null);

    const getNextPage = debounce((pagination: PaginationMetaData) => {
        const {currentPage, totalPage} = pagination;
        if (currentPage < totalPage) movePage && movePage(currentPage + 1, true);
    }, 100);

    const items = result?.items || [];

    const addTeam = () => {
        // TODO: Add team
        console.log('addTeam');
    };

    return (
        <div ref={ref}>
            <LoadableBox isLoading={isLoading} loadingType={2} noPadding>
                <div className="grid grid-cols-3 sm:grid-cols-6 gap-4 mx-auto">
                    <div
                        onClick={addTeam}
                        className="card rounded-xl shadow border border-gray-200 p-4 cursor-pointer hover:shadow-md transition-all text-center bg-gray-200 items-center justify-center text-32 text-gray-600"
                    >
                        +
                    </div>

                    {items.map((team, i) => (
                        <TeamListItem team={team} key={i} />
                    ))}

                    {result?.pagination && (
                        <LoadMoreButton
                            pagination={result.pagination}
                            onClick={() => result && getNextPage(result.pagination)}
                        />
                    )}
                </div>
            </LoadableBox>
        </div>
    );
});
TeamListSection.displayName = 'TeamListSection';
