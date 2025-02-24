import {memo, useEffect} from 'react';
import {useRecoilValue} from 'recoil';
import {debounce} from 'lodash';
import {useMembershipListInAdminUserDetail} from '^models/Membership/hook';
import {useUnmount} from '^hooks/useUnmount';
import {LoadableBox} from '^components/util/loading';
import {CardTablePanel} from '^admin/share';
import {adminUserDetail} from '../index';
import {MembershipItem} from './MembershipItem';
import {UserIsAdminHandler} from './UserIsAdminHandler';

export const MembershipListTabContent = memo(() => {
    const user = useRecoilValue(adminUserDetail);
    const {search, isLoading, result, reload, reset, changePageSize, movePage} = useMembershipListInAdminUserDetail();

    const fetchList = debounce((userId: number) => {
        search({
            where: {userId},
            includeAdmin: true,
            order: {id: 'DESC'},
        });
    }, 500);

    useEffect(() => {
        user && fetchList(user.id);
    }, [user]);

    useUnmount(() => reset(), []);

    if (!user) return <></>;

    return (
        <LoadableBox isLoading={isLoading} loadingType={2} spinnerPos="center" noPadding>
            <div className="w-full">
                <div className="mb-6 flex items-center">
                    <h2>
                        {result.pagination.totalItemCount.toLocaleString()}
                        <small>개의 조직에 소속되어 있습니다.</small>
                    </h2>

                    <div className="ml-auto flex items-center gap-4">
                        <div>
                            <UserIsAdminHandler reload={reload} />
                        </div>
                        <div></div>
                    </div>
                </div>

                <CardTablePanel
                    gridClass="grid-cols-7"
                    entries={result.items}
                    pagination={result.pagination}
                    pageMove={movePage}
                    changePageSize={changePageSize}
                    ths={[
                        <div>조직</div>,
                        <div></div>,
                        <div>조직내 권한</div>,
                        <div>조직 가입 승인상태</div>,
                        <div>조직 링크</div>,
                        <div>가입일시</div>,
                    ]}
                    entryComponent={(membership, i, arr) => (
                        <MembershipItem
                            membership={membership}
                            key={`${membership.id}-${membership.level}`}
                            borderBottom={i + 1 < arr.length}
                            reload={reload}
                        />
                    )}
                />
            </div>
        </LoadableBox>
    );
});
