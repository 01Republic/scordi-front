import React, {memo, useEffect} from 'react';
import {useRecoilValue, useSetRecoilState} from 'recoil';
import {adminOrgDetail} from '^admin/orgs/AdminOrgDetailPage';
import {useAdminCodefAccounts2} from '^models/CodefAccount/hook';
import {PagePerSelect} from '^components/Paginator';
import {LoadableBox} from '^components/util/loading';
import {CardTablePanel} from '^admin/share';
import {getCodefAccountColumns} from './columns';
import {TabPaneProps} from '^components/util/tabs';
import {selectedCodefAccountAtom} from '../atoms';
import {confirm2, confirmed} from '^components/util/dialog';
import {codefAccountAdminApi} from '^models/CodefAccount/api';
import {toast} from 'react-hot-toast';
import {errorToast} from '^api/api';
import {CodefRequestBusinessType} from '^models/CodefAccount/type/enums';
import {useIdParam} from '^atoms/common';

export const CodefAccountListContent = memo(function (props: TabPaneProps) {
    const {moveTab = console.log} = props;
    const org = useRecoilValue(adminOrgDetail);
    const setSelectedCodefAccount = useSetRecoilState(selectedCodefAccountAtom);
    const orgId = useIdParam('id');
    const {result, isLoading, reload, movePage, changePageSize} = useAdminCodefAccounts2(orgId, {
        relations: ['connectedIdentity', 'codefCards', 'creditCards'],
        where: {businessType: CodefRequestBusinessType.Card},
        order: {id: 'DESC'},
    });

    useEffect(() => {
        if (!org) return;
        setSelectedCodefAccount(undefined);
    }, [org]);

    if (!org) return <></>;

    const {items, pagination} = result;

    return (
        <div>
            <div className="flex items-center justify-between text-14">
                <div>
                    총 {pagination.totalItemCount}개의 결과, {pagination.totalPage}p 중 {pagination.currentPage}p
                </div>

                <div className="flex items-center gap-4">
                    <button
                        className="btn btn-xs btn-white"
                        onClick={() => {
                            const sync = () => confirm2('코드에프에서 지워지지 않고 남아있는 계정을 복원합니다.');
                            confirmed(sync())
                                .then(() => codefAccountAdminApi.sync(org.id))
                                .then(() => reload())
                                .then(() => toast.success('복원 완료'))
                                .catch(errorToast);
                        }}
                    >
                        [코드에프] 계정복원
                    </button>

                    <PagePerSelect
                        isLoading={isLoading}
                        className="select-sm"
                        defaultValue={pagination.itemsPerPage}
                        changePageSize={changePageSize}
                        allowAll
                    />
                </div>
            </div>

            <br />

            <LoadableBox isLoading={isLoading} loadingType={2} noPadding>
                <CardTablePanel
                    gridClass={`grid-cols-9`}
                    entries={items}
                    pagination={pagination}
                    pageMove={movePage}
                    columns={getCodefAccountColumns({
                        reload,
                        moveTab: (tabIndex, account) => {
                            moveTab(tabIndex);
                            setSelectedCodefAccount(account);
                        },
                    })}
                />
            </LoadableBox>
        </div>
    );
});
