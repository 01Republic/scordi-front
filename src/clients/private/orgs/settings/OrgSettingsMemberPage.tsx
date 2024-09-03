import React, {memo, useEffect, useState} from 'react';
import {OrgSettingsLayout} from '^clients/private/orgs/settings/OrgSettingsLayout';
import {orgIdParamState, teamIdParamState, useRouterIdParamState} from '^atoms/common';
import {OrgSettingsMemberPageRoute} from '^pages/orgs/[id]/settings/members';
import {ListPageSearchInput} from '^clients/private/_layouts/_shared/ListPageSearchInput';
import {useTeamMembershipListInTeamDetail} from '^models/TeamMembership/hook';
import {FaPlus} from 'react-icons/fa6';
import {useRecoilValue} from 'recoil';
import {ListTable, ListTableContainer} from '^clients/private/_components/table/ListTable';
import {EmptyTable} from '^clients/private/_components/table/EmptyTable';
import {OrgMembersTableHeader} from '^clients/private/orgs/settings/members/OrgMembersTableHeader';
import {OrgMembersTableRow} from '^clients/private/orgs/settings/members/OrgMembersTableRow';
import {useCurrentOrg} from '^models/Organization/hook';
import {useMembershipInMembershipTable} from '^models/Membership/hook';

export const OrgSettingsMemberPage = memo(function () {
    const orgId = useRouterIdParamState('id', orgIdParamState);
    const teamId = useRouterIdParamState('teamId', teamIdParamState);

    const {search, result, isLoading, query, searchAndUpdateCounter, movePage, changePageSize, reload, orderBy} =
        useMembershipInMembershipTable();
    const [isOpened, setIsOpened] = useState(false);

    const onSearch = (keyword?: string) => {
        search({
            relations: ['teamMember', 'teamMember.membership'],
            where: {organizationId: orgId},
            keyword,
        });
    };

    useEffect(() => {
        !!orgId && search({where: {organizationId: orgId}, relations: ['teamMember', 'teamMember.membership']});
    }, [orgId]);

    return (
        <OrgSettingsLayout
            breadcrumbPath={{
                text: '멤버 관리',
                active: true,
                href: OrgSettingsMemberPageRoute.path(orgId),
            }}
        >
            <div className={'text-xl font-bold my-4'}>멤버 관리</div>
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
            {result.items && result.pagination.totalItemCount > 0 ? (
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
                        Header={() => <OrgMembersTableHeader orderBy={orderBy} />}
                        Row={({item}) => <OrgMembersTableRow teamMember={item.user} reload={reload} />}
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
        </OrgSettingsLayout>
    );
});
