import React, {memo} from 'react';
import {TabPaneProps} from '^components/util/tabs';
import {useRecoilState, useRecoilValue, useSetRecoilState} from 'recoil';
import {adminOrgDetail} from '^admin/orgs/AdminOrgDetailPage';
import {PagePerSelect} from '^components/Paginator';
import {X} from 'lucide-react';
import {LoadableBox} from '^components/util/loading';
import {CardTablePanel} from '^admin/share';
import {useGoogleWorkspaceMemberListInAdmin} from '^models/integration/IntegrationGoogleWorkspaceMember/hooks';
import {selectedGoogleWorkspaceAtom, selectedGoogleWorkspaceMemberAtom} from '../atoms';
import {Avatar} from '^components/Avatar';
import {TeamMemberProfileCompact} from '^models/TeamMember/components/TeamMemberProfile';
import {format} from 'date-fns';
import {ko} from 'date-fns/locale';
import {unitFormat} from '^utils/number';

export const GoogleWorkspaceMemberListTabContent = memo(function (props: TabPaneProps) {
    const {moveTab = console.log} = props;
    const org = useRecoilValue(adminOrgDetail);
    const [selectedWorkspace, setSelectedWorkspace] = useRecoilState(selectedGoogleWorkspaceAtom);
    const query = useGoogleWorkspaceMemberListInAdmin(org?.id || NaN, selectedWorkspace?.id || NaN, {
        relations: ['integrationWorkspace', 'teamMember'],
        where: {
            integrationWorkspaceId: selectedWorkspace?.id,
            integrationWorkspace: {organizationId: org?.id},
        },
        order: {id: 'DESC'},
    });
    const setSelectedWorkspaceMember = useSetRecoilState(selectedGoogleWorkspaceMemberAtom);

    const {data, movePage, changePageSize, search, isFetching, refetch} = query;
    const {items, pagination} = data;

    return (
        <div>
            <div className="flex items-center justify-between text-14">
                <div>
                    총 {pagination.totalItemCount}개의 결과, {pagination.totalPage}p 중 {pagination.currentPage}p
                </div>

                <div className="flex items-center gap-4">
                    <PagePerSelect
                        className="select-sm"
                        defaultValue={pagination.itemsPerPage}
                        changePageSize={changePageSize}
                        allowAll
                    />
                </div>
            </div>

            <br />

            {selectedWorkspace && (
                // Filter Section
                <section className="flex items-center text-12 gap-4 mb-4">
                    {/* Filter: CodefCard */}
                    <div className="flex items-center">
                        <div className="mr-2">선택된 워크스페이스:</div>
                        <div
                            className="flex items-center group cursor-pointer"
                            onClick={() => {
                                setSelectedWorkspace(undefined);
                                search((q) => ({...q, where: {...q.where, integrationWorkspaceId: undefined}}));
                            }}
                        >
                            <div className="">{selectedWorkspace.workspaceName}</div>
                            <X size={20} className="text-gray-400 group-hover:text-gray-800 transition-all" />
                        </div>
                    </div>
                </section>
            )}

            <LoadableBox isLoading={isFetching} loadingType={2} noPadding>
                <CardTablePanel
                    gridClass={`grid-cols-8`}
                    entries={items}
                    pagination={pagination}
                    pageMove={movePage}
                    columns={[
                        {
                            th: 'ID',
                            className: 'text-12',
                            render: (member) => (
                                <div>
                                    <span className="badge badge-xs">#{member.id}</span>
                                </div>
                            ),
                        },
                        {
                            th: '프로필',
                            className: 'text-12 col-span-2',
                            render: (member) => (
                                <div
                                    className="flex items-center gap-2 cursor-pointer hover:text-scordi"
                                    onClick={() => {
                                        moveTab(2);
                                        setSelectedWorkspaceMember(member);
                                    }}
                                >
                                    <div>
                                        <Avatar src={member.imageUrl || undefined} className="w-[16px] h-[16px]" />
                                    </div>
                                    <div className="leading-none">
                                        <div className="font-medium">{member.displayName}</div>
                                        <div className="font-light text-[10px]">{member.email}</div>
                                    </div>
                                </div>
                            ),
                        },
                        {
                            th: '워크스페이스',
                            className: 'text-12',
                            render: (member) => (
                                <div>
                                    {member.integrationWorkspace ? (
                                        <span className="">{member.integrationWorkspace.workspaceName}</span>
                                    ) : (
                                        <span className="text-gray-400">(비어있음)</span>
                                    )}
                                </div>
                            ),
                        },
                        {
                            th: '연결된 구성원',
                            className: 'text-12',
                            render: (member) => (
                                <div>
                                    {member.teamMember ? (
                                        <TeamMemberProfileCompact item={member.teamMember} />
                                    ) : (
                                        <span className="text-gray-400">(연결안됨)</span>
                                    )}
                                </div>
                            ),
                        },
                        {
                            th: '등록일시',
                            className: 'text-12',
                            render: (member) => <div>{format(member.createdAt, 'Pp', {locale: ko})}</div>,
                        },
                        {
                            th: '등록된 구독수',
                            className: 'text-12',
                            render: (member) => <div>{unitFormat(member.subscriptionCount)}</div>,
                        },
                        {
                            th: '', // Action columns
                            className: 'text-12',
                            render: (member) => <div>{/*<span className="badge badge-xs">#{member.id}</span>*/}</div>,
                        },
                    ]}
                />
            </LoadableBox>
        </div>
    );
});
