import {memo, useEffect, useState} from 'react';
import {useRecoilValue} from 'recoil';
import {adminOrgDetail} from '^admin/orgs/AdminOrgDetailPage';
import {CardTablePanel} from '^admin/share';
import {useUnmount} from '^hooks/useUnmount';
import {useMembershipListInAdminOrgDetail} from '^models/Membership/hook';
import {MembershipDto, MembershipLevel} from '^models/Membership/types';
import {FindOptionsWhere} from '^types/utils/find-options';
import {LoadableBox} from '^components/util/loading';
import {UserItem} from './UserItem';
import {ChangeOrgModal} from './ChangeOrgModal';

enum LevelViewMode {
    UserOnly = 'UserOnly',
    AdminOnly = 'AdminOnly',
    All = 'All',
}

export const UserListTabContent = memo(() => {
    const org = useRecoilValue(adminOrgDetail);
    const {isLoading, result, search, movePage, changePageSize, reset, reload} = useMembershipListInAdminOrgDetail();
    const [changeOrgModalSubject, setChangeOrgModalSubject] = useState<MembershipDto>();
    const isChangeOrgModalOpened = !!changeOrgModalSubject;

    const fetchList = (where: FindOptionsWhere<MembershipDto> = {}) => {
        if (!org) return;

        search({
            relations: ['user'],
            where: {organizationId: org.id, ...where},
            includeAdmin: true,
            order: {id: 'DESC'},
        });
    };

    const fetchAsLevelView = (mode: LevelViewMode) => {
        if (mode === LevelViewMode.UserOnly) fetchList({level: {op: 'not', val: MembershipLevel.ADMIN}});
        if (mode === LevelViewMode.AdminOnly) fetchList({level: MembershipLevel.ADMIN});
        if (mode === LevelViewMode.All) fetchList({level: undefined});
    };

    useEffect(() => {
        org && fetchAsLevelView(LevelViewMode.UserOnly);
    }, [org]);

    useUnmount(() => reset());

    if (!org) return <></>;

    const {items, pagination} = result;

    return (
        <div className="w-full">
            <div className="mb-6 flex items-center">
                <h2>
                    {pagination.totalItemCount.toLocaleString()}
                    <small>명이 소속되어 있습니다.</small>
                </h2>

                <div className="ml-auto flex items-center gap-4">
                    <div>
                        <select
                            className="select select-sm select-bordered"
                            defaultValue={LevelViewMode.UserOnly}
                            onChange={(e) => {
                                fetchAsLevelView(e.target.value as LevelViewMode);
                            }}
                        >
                            <option value={LevelViewMode.UserOnly}>사용자만 보기</option>
                            <option value={LevelViewMode.AdminOnly}>관리자만 보기</option>
                            <option value={LevelViewMode.All}>전체 보기</option>
                        </select>
                    </div>
                    <div></div>
                </div>
            </div>

            <LoadableBox isLoading={isLoading} loadingType={2} spinnerPos="center" noPadding>
                <CardTablePanel
                    gridClass="grid-cols-6"
                    entries={items}
                    ths={[
                        <div>멤버십 id</div>,
                        <div>회원</div>,
                        <div>권한</div>,
                        <div>가입 승인상태</div>,
                        <div>워크스페이스 가입일시</div>,
                        <div></div>,
                    ]}
                    entryComponent={(membership) => (
                        <UserItem
                            key={membership.id}
                            membership={membership}
                            reload={reload}
                            openChangeOrgModal={() => setChangeOrgModalSubject(membership)}
                        />
                    )}
                    pagination={pagination}
                    pageMove={movePage}
                    changePageSize={changePageSize}
                />
            </LoadableBox>

            <ChangeOrgModal
                membership={changeOrgModalSubject}
                isOpened={isChangeOrgModalOpened}
                onClose={() => {
                    setChangeOrgModalSubject(undefined);
                    reload && reload();
                }}
            />
        </div>
    );
});
