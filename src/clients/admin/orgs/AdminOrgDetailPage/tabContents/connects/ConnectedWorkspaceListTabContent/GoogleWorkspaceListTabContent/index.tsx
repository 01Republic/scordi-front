import React, {memo} from 'react';
import {useRecoilValue, useSetRecoilState} from 'recoil';
import {TabPaneProps} from '^components/util/tabs';
import {adminOrgDetail} from '^admin/orgs/AdminOrgDetailPage';
import {LoadableBox} from '^components/util/loading';
import {CardTablePanel} from '^admin/share';
import {useGoogleWorkspaceListInAdmin} from '^models/integration/IntegrationGoogleWorkspaceWorkspace/hook';
import {format} from 'date-fns';
import {ko} from 'date-fns/locale';
import {unitFormat} from '^utils/number';
import {GoogleProfileSimple} from '^v3/V3OrgSettingsConnectsPage/WorkspaceSection/Buttons/GoogleProfile';
import {selectedGoogleWorkspaceAtom} from '../atoms';

export const GoogleWorkspaceListTabContent = memo(function (props: TabPaneProps) {
    const {moveTab = console.log} = props;
    const org = useRecoilValue(adminOrgDetail);
    const {
        data,
        isFetching: isLoading,
        refetch: reload,
    } = useGoogleWorkspaceListInAdmin(org?.id || NaN, {
        itemsPerPage: 0,
    });
    const setSelectedWorkspace = useSetRecoilState(selectedGoogleWorkspaceAtom);

    if (!org) return <></>;

    const {items, pagination} = data;

    return (
        <div>
            <div className="flex items-center justify-between text-14">
                <div>
                    총 {pagination.totalItemCount}개의 결과, {pagination.totalPage}p 중 {pagination.currentPage}p
                </div>

                <div className="flex items-center gap-4">
                    {/*<button*/}
                    {/*    className="btn btn-xs btn-white"*/}
                    {/*    // onClick={() => {*/}
                    {/*    //     const sync = () => confirm2('코드에프에서 지워지지 않고 남아있는 계정을 복원합니다.');*/}
                    {/*    //     confirmed(sync())*/}
                    {/*    //         .then(() => codefAccountAdminApi.sync(org.id))*/}
                    {/*    //         .then(() => reload())*/}
                    {/*    //         .then(() => toast.success('복원 완료'))*/}
                    {/*    //         .catch(errorToast);*/}
                    {/*    // }}*/}
                    {/*>*/}
                    {/*    [코드에프] 계정복원*/}
                    {/*</button>*/}

                    {/*<PagePerSelect*/}
                    {/*    className="select-sm"*/}
                    {/*    defaultValue={pagination.itemsPerPage}*/}
                    {/*    changePageSize={changePageSize}*/}
                    {/*    allowAll*/}
                    {/*/>*/}
                </div>
            </div>

            <br />

            <LoadableBox isLoading={isLoading} loadingType={2} noPadding>
                <CardTablePanel
                    gridClass={`grid-cols-8`}
                    entries={items}
                    pagination={pagination}
                    // pageMove={movePage}
                    columns={[
                        {
                            th: '워크스페이스명',
                            className: 'text-12 col-span-2',
                            render: (workspace) => (
                                <div
                                    className="flex items-center gap-2 cursor-pointer hover:text-scordi"
                                    onClick={() => {
                                        setSelectedWorkspace(workspace);
                                        moveTab(1);
                                    }}
                                >
                                    <span className="badge badge-xs">#{workspace.id}</span>
                                    <span>{workspace.workspaceName}</span>
                                </div>
                            ),
                        },
                        {
                            th: 'UID',
                            className: 'text-12',
                            render: (workspace) => <div>{workspace.unitId}</div>,
                        },
                        {
                            th: '호스트 계정 (토큰)',
                            className: 'text-12 col-span-2',
                            render: (workspace) => (
                                <div>
                                    <GoogleProfileSimple tokenData={workspace.authorizedResponse.googleTokenData} />
                                </div>
                            ),
                        },
                        {
                            th: '등록일시',
                            className: 'text-12',
                            render: (workspace) => <div>{format(workspace.createdAt, 'Pp', {locale: ko})}</div>,
                        },
                        {
                            th: '등록된 구독수',
                            className: 'text-12',
                            render: (workspace) => <div>{unitFormat(workspace.subscriptionCount)}</div>,
                        },
                        {
                            th: '', // Actions column
                            className: 'text-12',
                            render: (workspace) => <div></div>,
                        },
                    ]}
                />
            </LoadableBox>
        </div>
    );
});
