import React, {memo, useEffect, useState} from 'react';
import {useRecoilValue} from 'recoil';
import {orgIdParamState} from '^atoms/common';
import {useMembershipInMembershipTable} from '^models/Membership/hook';
import {FindAllMembershipQuery, MembershipLevel} from '^models/Membership/types';
import {OrgSettingsMemberPageRoute} from '^pages/orgs/[id]/settings/members';
import {OrgSettingsLayout} from '^clients/private/_layouts/OrgSettingsLayout';
import {ListPageSearchInputStandAlone} from '^clients/private/_layouts/_shared/ListPageSearchInput';
import {ListTable2, ListTableContainer, NoStyleTableLayout} from '^clients/private/_components/table/ListTable';
import {OrgMembersTableHeader} from './OrgMembersTableHeader';
import {OrgMembersTableRow} from './OrgMembersTableRow';
import {InviteMemberModal} from '^clients/private/orgs/settings/OrgSettingsMembersPage/InviteMemberModal';
import {OrgSettingsCardSection} from '^clients/private/_layouts/OrgSettingsLayout/OrgSettingsCardSection';
import {Plus} from 'lucide-react';

export const OrgSettingsMembersPage = memo(function () {
    const orgId = useRecoilValue(orgIdParamState);
    const {search, result, isLoading, isNotLoaded, isEmptyResult, movePage, changePageSize, reload, orderBy} =
        useMembershipInMembershipTable();
    const [isOpened, setIsOpened] = useState(false);

    const fetchAll = (params: FindAllMembershipQuery) => {
        return search({
            relations: ['user', 'teamMember'],
            ...params,
            where: {
                organizationId: orgId,
                level: {op: 'not', val: MembershipLevel.ADMIN},
                // userId: {op: 'not', val: 'NULL'},
                ...params.where,
            },
            includeAdmin: true,
            itemsPerPage: 0,
        });
    };

    const onSearch = (keyword?: string) => fetchAll({keyword});

    useEffect(() => {
        !!orgId && fetchAll({});
    }, [orgId]);

    return (
        <OrgSettingsLayout
            breadcrumbPath={{
                text: '멤버 관리',
                active: true,
                href: OrgSettingsMemberPageRoute.path(orgId),
            }}
        >
            <OrgSettingsCardSection>
                <div className={'flex items-center justify-between pb-4'}>
                    <div>
                        {/*전체 <span className={'text-scordi-500'}>{result.pagination.totalItemCount.toLocaleString()}</span>*/}
                        <ListPageSearchInputStandAlone
                            className="input-sm"
                            onSearch={onSearch}
                            placeholder={'검색어를 입력해주세요'}
                        />
                    </div>
                    <div className={'flex space-x-4'}>
                        {/*<ListPageSearchInput onSearch={onSearch} placeholder={'검색어를 입력해주세요'} />*/}
                        <button className="btn btn-scordi btn-sm gap-2 rounded-lg" onClick={() => setIsOpened(true)}>
                            <Plus fontSize={16} />
                            <span>멤버 초대</span>
                        </button>
                    </div>
                </div>

                <ListTableContainer
                    Layout={NoStyleTableLayout}
                    pagination={result.pagination}
                    movePage={movePage}
                    changePageSize={changePageSize}
                    unit="개"
                    hideTopPaginator
                    hideBottomPaginator
                    isLoading={isLoading}
                    isNotLoaded={isNotLoaded}
                    isEmptyResult={isEmptyResult}
                    emptyMessage="구성원이 없어요."
                    emptyButtonText="구성원 등록"
                    emptyButtonOnClick={() => setIsOpened(true)}
                >
                    <ListTable2
                        items={result.items}
                        isLoading={isLoading}
                        Header={() => <OrgMembersTableHeader orderBy={orderBy} pagination={result.pagination} />}
                        Row={({item}) => (
                            <OrgMembersTableRow
                                membership={item}
                                reload={reload}
                                onClick={(membership) => console.log('membership', membership)}
                            />
                        )}
                    />
                </ListTableContainer>
            </OrgSettingsCardSection>

            <InviteMemberModal
                organizationId={orgId}
                isOpened={isOpened}
                onClose={() => setIsOpened(false)}
                reload={reload}
            />
        </OrgSettingsLayout>
    );
});
