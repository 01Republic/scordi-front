import {TeamDetailLayout} from '^clients/private/orgs/team/teams/TeamDetailPage/TeamDetailLayout';
import React, {memo, useEffect} from 'react';
import {ListTable} from '^clients/private/_components/table/ListTable';
import {ListPageSearchInput} from '^clients/private/_layouts/_shared/ListPageSearchInput';
import {useTeamMembershipListInTeamDetail} from '^models/TeamMembership/hook';
import {useRecoilValue} from 'recoil';
import {teamIdParamState} from '^atoms/common';
import {FaPlus} from 'react-icons/fa6';
import {TeamMembershipTableHeader} from './TeamMembershipTableHeader';
import {TeamMembershipTableRow} from './TeamMembershipTableRow';

export const TeamMembersListPage = memo(function TeamMembersDetailPage() {
    const teamId = useRecoilValue(teamIdParamState);
    // TODO: 팀 멤버 리스트만 불러와야 함
    const {search, result, isLoading, reload, orderBy, reset} = useTeamMembershipListInTeamDetail();

    useEffect(() => {
        if (!teamId || isNaN(teamId)) return;

        search({
            relations: ['teamMember', 'team'],
            where: {teamId},
            order: {teamMemberId: 'DESC'},
        });
    }, [teamId]);

    useEffect(() => () => reset(), []);

    const onSearch = () => {
        console.log('search');
    };

    return (
        <TeamDetailLayout>
            <div className={'flex items-center justify-between pb-4'}>
                <div>
                    전체 <b className="text-scordi">{result.pagination.totalItemCount.toLocaleString()}</b>
                </div>
                <div className={'flex space-x-4'}>
                    <ListPageSearchInput onSearch={onSearch} placeholder={'검색어를 입력해주세요'} />
                    <button className="btn btn-scordi gap-2 mb-1" onClick={() => console.log('click')}>
                        <FaPlus />
                        <span>멤버 등록</span>
                    </button>
                </div>
            </div>
            <ListTable
                items={result.items}
                isLoading={isLoading}
                Header={() => <TeamMembershipTableHeader orderBy={orderBy} />}
                Row={({item}) => <TeamMembershipTableRow teamMembership={item} reload={reload} />}
            />
        </TeamDetailLayout>
    );
});
