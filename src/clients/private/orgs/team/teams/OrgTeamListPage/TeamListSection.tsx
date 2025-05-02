import {memo, useRef, useState} from 'react';
import {LoadableBox} from '^components/util/loading';
import {Paginated, PaginationMetaData} from '^types/utils/paginated.dto';
import {debounce} from 'lodash';
import {TeamDto} from '^models/Team/type';
import {TeamListItem} from './TeamListItem';
import {LoadMoreButton} from './LoadMoreButton';
import {prompt2} from '^components/util/dialog';
import {teamApi} from '^models/Team/api';
import {useOrgIdParam} from '^atoms/common';
import {useTeamsForListPage} from '^models/Team/hook';
import {toast} from 'react-hot-toast';
import {errorToast} from '^api/api';

interface TeamListSectionProps {
    // result?: Paginated<TeamDto>;
    // isLoading?: boolean;
    // movePage?: (page: number, append?: boolean) => Promise<any>;
}

export const TeamListSection = memo((props: TeamListSectionProps) => {
    // const {isLoading = false, result, movePage} = props;
    const ref = useRef<HTMLDivElement>(null);
    const orgId = useOrgIdParam();
    const {isLoading, result, movePage, reload} = useTeamsForListPage();
    const [isAdding, setIsAdding] = useState(false);

    // const getNextPage = debounce((pagination: PaginationMetaData) => {
    //     const {currentPage, totalPage} = pagination;
    //     if (currentPage < totalPage) movePage && movePage(currentPage + 1, true);
    // }, 100);

    const {items, pagination} = result;

    const addTeam = async () => {
        const result = await prompt2(`팀 이름을 입력해주세요.`);
        if (result.isConfirmed && result.value) {
            setIsAdding(true);
            teamApi
                .create(orgId, {name: result.value})
                .then(() => toast.success(`'${result.value}' 팀을 추가했어요.`))
                .then(() => reload())
                .catch(errorToast)
                .finally(() => setIsAdding(false));
        }
    };

    return (
        <div ref={ref}>
            <LoadableBox isLoading={isLoading || isAdding} loadingType={2} noPadding>
                <div className="grid grid-cols-3 sm:grid-cols-6 gap-4 mx-auto mb-4">
                    <div
                        onClick={addTeam}
                        className="card rounded-xl shadow border border-gray-200 p-4 cursor-pointer hover:shadow-md transition-all text-center bg-gray-200 items-center justify-center text-32 text-gray-600"
                    >
                        +
                    </div>

                    {items.map((team, i) => (
                        <TeamListItem team={team} key={i} reload={reload} />
                    ))}
                </div>

                <div className="flex justify-center">
                    {pagination.currentPage < pagination.totalPage && (
                        <LoadMoreButton
                            pagination={pagination}
                            onClick={() => movePage(pagination.currentPage + 1, true)}
                        />
                    )}
                </div>
            </LoadableBox>
        </div>
    );
});
TeamListSection.displayName = 'TeamListSection';
