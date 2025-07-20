import React, {memo, useEffect, useState} from 'react';
import {useTranslation} from 'next-i18next';
import {useRecoilValue} from 'recoil';
import {useUnmount} from '^hooks/useUnmount';
import {ListPageSearchInput} from '^clients/private/_layouts/_shared/ListPageSearchInput';
import {ListTable, ListTableContainer} from '^clients/private/_components/table/ListTable';
import {teamIdParamState} from '^atoms/common';
import {TeamMembersTableRow} from '^clients/private/orgs/team/teams/OrgTeamDetailPage/Members/TeamMembersTableRow';
import {TeamMembersTableHeader} from '^clients/private/orgs/team/teams/OrgTeamDetailPage/Members/TeamMembersTableHeader';
import {useTeamMembershipListInTeamDetail} from '^models/TeamMembership/hook';
import {AddMemberModal} from '^clients/private/orgs/team/teams/OrgTeamDetailPage/Members/AddMemberModal';
import {OrgTeamDetailPageTabContentCommonProps} from '../OrgTeamDetailPageTabContent';
import {Plus} from 'lucide-react';
import {useCheckboxHandler} from '^hooks/useCheckboxHandler';
import {TeamMembershipDto} from '^models/TeamMembership/type';
import {TeamMembersBulkActionPanel} from '^clients/private/orgs/team/teams/OrgTeamDetailPage/Members/TeamMembersBulkActionPanel';

export const TeamMembersListPage = memo(function (props: OrgTeamDetailPageTabContentCommonProps) {
    const {t} = useTranslation('teams');
    const {t: tCommon} = useTranslation('common');
    const {reload: reloadParent} = props;
    const teamId = useRecoilValue(teamIdParamState);
    const {search, result, isNotLoaded, isEmptyResult, isLoading, movePage, changePageSize, reload, orderBy, reset} =
        useTeamMembershipListInTeamDetail();
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
        if (!teamId || isNaN(teamId)) return;
        onSearch();
    }, [teamId]);

    useEffect(() => {
        ch.init(result.items);
    }, [result.items]);

    useUnmount(() => reset());

    const {totalItemCount} = result.pagination;

    return (
        <>
            <div className={'flex items-center justify-between pb-4'}>
                <div>
                    {tCommon('table.total')}{' '}
                    <span className={'text-scordi-500'}>{totalItemCount.toLocaleString()}</span>
                </div>
                <div className={'flex space-x-4'}>
                    <ListPageSearchInput onSearch={onSearch} placeholder={t('list.searchPlaceholder') as string} />
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
                emptyMessage={t('list.noMembers') as string}
                emptyButtonText={t('members.addMember') as string}
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
        </>
    );
});
