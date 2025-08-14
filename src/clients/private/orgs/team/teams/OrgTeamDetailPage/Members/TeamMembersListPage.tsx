import React, {memo, useEffect, useState} from 'react';
import {Plus} from 'lucide-react';
import {useIdParam, useOrgIdParam} from '^atoms/common';
import {useTeamMembership2} from '^models/TeamMembership/hook/hook';
import {useCheckboxHandler} from '^hooks/useCheckboxHandler';
import {TeamMembershipDto} from '^models/TeamMembership/type';
import {OrgTeamDetailPageTabContentCommonProps} from '../OrgTeamDetailPageTabContent';
import {ListPageSearchInput} from '^clients/private/_layouts/_shared/ListPageSearchInput';
import {ListTable, ListTableContainer} from '^clients/private/_components/table/ListTable';
import {TeamMembersTableRow} from '../Members/TeamMembersTableRow';
import {TeamMembersTableHeader} from '../Members/TeamMembersTableHeader';
import {TeamMembersBulkActionPanel} from '../Members/TeamMembersBulkActionPanel';
import {AddMemberModal} from '../Members/AddMemberModal';

export const TeamMembersListPage = memo(function (props: OrgTeamDetailPageTabContentCommonProps) {
    const {reload: reloadParent} = props;
    const orgId = useOrgIdParam();
    const teamId = useIdParam('teamId');
    const {search, result, isNotLoaded, isEmptyResult, isLoading, movePage, changePageSize, reload, orderBy} =
        useTeamMembership2(orgId, teamId, {
            relations: ['teamMember', 'teamMember.membership'],
            where: {teamId},
        });
    const [isOpened, setIsOpened] = useState(false);
    const ch = useCheckboxHandler<TeamMembershipDto>([], (item) => item.teamMemberId);

    const onSearch = (keyword?: string) => {
        search({
            relations: ['teamMember', 'teamMember.membership'],
            where: {teamId},
            keyword,
        });
    };

    useEffect(() => {
        ch.init(result.items);
    }, [result.items]);

    const {totalItemCount} = result.pagination;

    return (
        <>
            <div className={'flex items-center justify-between pb-4'}>
                <div>
                    전체 <span className={'text-scordi-500'}>{totalItemCount.toLocaleString()}</span>
                </div>
                <div className={'flex space-x-4'}>
                    <ListPageSearchInput onSearch={onSearch} placeholder={'검색어를 입력해주세요'} />
                    <button
                        className="btn btn-square btn-scordi animate-none btn-animation"
                        onClick={() => setIsOpened(true)}
                    >
                        <Plus fontSize={20} />
                    </button>
                </div>
            </div>
            <ListTableContainer
                pagination={result.pagination}
                movePage={movePage}
                changePageSize={changePageSize}
                unit="개"
                hideTopPaginator={true}
                // Empty State Props
                isNotLoaded={isNotLoaded}
                isLoading={isLoading}
                isEmptyResult={isEmptyResult}
                emptyMessage="연결된 구성원이 없어요."
                emptyButtonText="구성원 연결"
                emptyButtonOnClick={() => setIsOpened(true)}
            >
                {!ch.isEmpty && (
                    <TeamMembersBulkActionPanel
                        checkboxHandler={ch}
                        reload={() => {
                            reload();
                            reloadParent();
                        }}
                    />
                )}

                <ListTable
                    items={result.items}
                    isLoading={isLoading}
                    Header={() => (
                        <TeamMembersTableHeader
                            orderBy={orderBy}
                            isChecked={ch.isCheckedAll()}
                            onCheck={(checked) => ch.checkAll(checked)}
                        />
                    )}
                    Row={({item}) => (
                        <TeamMembersTableRow
                            teamMember={item.teamMember}
                            isChecked={ch.isChecked(item)}
                            onCheck={(checked) => ch.checkOne(item, checked)}
                            reload={() => {
                                reload();
                                reloadParent();
                            }}
                        />
                    )}
                />
            </ListTableContainer>

            {/* 연결 추가 모달 */}
            {isOpened && (
                <AddMemberModal
                    isOpened={isOpened}
                    onClose={() => {
                        setIsOpened(false);
                    }}
                    onCreate={() => {
                        setIsOpened(false);
                        reload();
                    }}
                />
            )}
        </>
    );
});
