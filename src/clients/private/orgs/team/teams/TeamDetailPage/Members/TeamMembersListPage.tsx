import React, {memo, useEffect, useState} from 'react';
import {ListPageSearchInput} from '^clients/private/_layouts/_shared/ListPageSearchInput';
import {ListTable, ListTableContainer} from '^clients/private/_components/table/ListTable';
import {useRecoilValue} from 'recoil';
import {teamIdParamState} from '^atoms/common';
import {TeamMembersTableRow} from '^clients/private/orgs/team/teams/TeamDetailPage/Members/TeamMembersTableRow';
import {TeamMembersTableHeader} from '^clients/private/orgs/team/teams/TeamDetailPage/Members/TeamMembersTableHeader';
import {useTeamMembershipListInTeamDetail} from '^models/TeamMembership/hook';
import {AddMemberModal} from '^clients/private/orgs/team/teams/TeamDetailPage/Members/AddMemberModal';
import {FaPlus} from 'react-icons/fa6';
import {EmptyTable} from '^clients/private/_components/table/EmptyTable';

export const TeamMembersListPage = memo(function TeamMembersListPage() {
    const teamId = useRecoilValue(teamIdParamState);
    const {search, result, isLoading, query, searchAndUpdateCounter, movePage, changePageSize, reload, orderBy} =
        useTeamMembershipListInTeamDetail();
    const [isOpened, setIsOpened] = useState(false);

    useEffect(() => {
        !!teamId && search({where: {teamId: teamId}, relations: ['teamMember', 'teamMember.membership']});
    }, [teamId]);

    const onSearch = (keyword?: string) => {
        search({
            relations: ['teamMember', 'teamMember.membership'],
            where: {teamId: teamId},
            keyword,
        });
    };

    return (
        <>
            <div className={'flex items-center justify-between pb-4'}>
                <div>
                    전체 <span className={'text-scordi-500'}>{result.pagination.totalItemCount}</span>
                </div>
                <div className={'flex space-x-4'}>
                    <ListPageSearchInput onSearch={onSearch} placeholder={'검색어를 입력해주세요'} />
                    <button className="btn btn-square btn-scordi mb-1" onClick={() => setIsOpened(true)}>
                        <FaPlus fontSize={20} />
                    </button>
                </div>
            </div>
            {result.items.length > 0 ? (
                <ListTableContainer
                    pagination={result.pagination}
                    movePage={movePage}
                    changePageSize={changePageSize}
                    unit="개"
                    hideTopPaginator={true}
                >
                    <ListTable
                        items={result.items}
                        isLoading={isLoading}
                        Header={() => <TeamMembersTableHeader orderBy={orderBy} />}
                        Row={({item}) => <TeamMembersTableRow teamMember={item.teamMember} reload={reload} />}
                    />
                </ListTableContainer>
            ) : (
                <EmptyTable
                    icon={'👤'}
                    message="등록된 구성원이 없어요."
                    buttonText={'구성원 등록'}
                    buttonAction={() => setIsOpened(true)}
                />
            )}

            {/* 연결 추가 모달 */}
            <AddMemberModal
                preItems={result.items}
                isOpened={isOpened}
                onClose={() => {
                    reload();
                    setIsOpened(false);
                }}
            />
        </>
    );
});
