import React, {memo} from 'react';
import {TabPaneProps} from '^components/util/tabs';
import {useRecoilState, useRecoilValue} from 'recoil';
import {adminOrgDetail} from '^admin/orgs/AdminOrgDetailPage';
import {useGoogleWorkspaceOauthTokenActivityListInAdmin} from '^models/integration/IntegrationGoogleWorkspaceOauthTokenActivity/hook';
import {selectedGoogleWorkspaceMemberAtom} from '../atoms';
import {PagePerSelect} from '^components/Paginator';
import {X} from 'lucide-react';
import {LoadableBox} from '^components/util/loading';
import {CardTablePanel} from '^admin/share';
import {Avatar} from '^components/Avatar';
import {format} from 'date-fns';
import {ko} from 'date-fns/locale';
import {SubscriptionProfile} from '^models/Subscription/components';
import {IntegrationGoogleWorkspaceMemberDto} from '^models/integration/IntegrationGoogleWorkspaceMember/type/IntegrationGoogleWorkspaceMember.dto';
import Tippy from '@tippyjs/react';
import {ParserStatusColumn} from '^admin/orgs/AdminOrgDetailPage/tabContents/connects/ConnectedWorkspaceListTabContent/GoogleWorkspaceActivityListTabContent/ParserStatusColumn';

export const GoogleWorkspaceActivityListTabContent = memo(function (props: TabPaneProps) {
    const {moveTab = console.log} = props;
    const org = useRecoilValue(adminOrgDetail);
    const [selectedWorkspaceMember, setSelectedWorkspaceMember] = useRecoilState(selectedGoogleWorkspaceMemberAtom);
    const query = useGoogleWorkspaceOauthTokenActivityListInAdmin(
        org?.id || 0,
        selectedWorkspaceMember?.integrationWorkspaceId || 0,
        {
            relations: ['workspaceMember', 'subscription', 'productSimilarName', 'productSimilarName.product'],
            where: {
                workspace: {organizationId: org?.id},
                workspaceMemberId: selectedWorkspaceMember?.id,
            },
            order: {id: 'DESC'},
        },
    );

    const {data, movePage, changePageSize, search, isFetching, refetch} = query;
    const {items, pagination} = data;

    const selectMember = (member?: IntegrationGoogleWorkspaceMemberDto) => {
        setSelectedWorkspaceMember(member);
        const workspaceMemberId = member?.id;
        search((q) => ({
            ...q,
            where: {...q.where, workspaceMemberId},
            page: 1,
        }));
    };

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

            {selectedWorkspaceMember && (
                // Filter Section
                <section className="flex items-center text-12 gap-4 mb-4">
                    {/* Filter: CodefCard */}
                    <div className="flex items-center">
                        <div className="mr-2">선택된 워크스페이스 멤버:</div>
                        <div className="flex items-center group cursor-pointer" onClick={() => selectMember(undefined)}>
                            <div className="">{selectedWorkspaceMember.displayName}</div>
                            <X size={20} className="text-gray-400 group-hover:text-gray-800 transition-all" />
                        </div>
                    </div>
                </section>
            )}

            <LoadableBox isLoading={isFetching} loadingType={2} noPadding>
                <CardTablePanel
                    gridClass={`grid-cols-9`}
                    entries={items}
                    pagination={pagination}
                    pageMove={movePage}
                    columns={[
                        {
                            th: 'ID',
                            className: 'text-12',
                            render: (activity) => (
                                <div onClick={() => console.log(activity)}>
                                    <span className="badge badge-xs">#{activity.id}</span>
                                </div>
                            ),
                        },
                        {
                            th: '사용자',
                            className: 'text-12',
                            render: (activity) => {
                                const member = activity.workspaceMember;

                                return (
                                    <div>
                                        {member ? (
                                            <div
                                                className="flex items-center gap-2 cursor-pointer hover:text-scordi"
                                                onClick={() => selectMember(member)}
                                            >
                                                <div>
                                                    <Avatar
                                                        src={member.imageUrl || undefined}
                                                        className="w-[16px] h-[16px]"
                                                    />
                                                </div>
                                                <div className="leading-none">
                                                    <div className="font-medium">{member.displayName}</div>
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="text-gray-400">(비어있음)</div>
                                        )}
                                    </div>
                                );
                            },
                        },
                        {
                            th: '로그인한 앱 이름',
                            className: 'text-12 col-span-2',
                            render: (activity) => (
                                <div
                                    className={`${
                                        activity.productSimilarName?.isBlock
                                            ? 'line-through text-red-500 opacity-30'
                                            : ''
                                    }`}
                                >
                                    {activity.originalAppName}
                                </div>
                            ),
                        },
                        {
                            th: '파서 설정여부',
                            className: 'text-12',
                            render: (activity) => <ParserStatusColumn activity={activity} reload={refetch} />,
                        },
                        {
                            th: '연결된 구독',
                            className: 'text-12 col-span-2',
                            render: (activity) => {
                                const subscription = activity.subscription;

                                if (!subscription) return <div className="text-gray-400">(비어있음)</div>;

                                return (
                                    <div className="flex items-center gap-2">
                                        <SubscriptionProfile
                                            width={16}
                                            height={16}
                                            subscription={subscription}
                                            textClassName="!text-12"
                                        />
                                        <span className="badge badge-xs">#{subscription.id}</span>
                                    </div>
                                );
                            },
                        },
                        {
                            th: '등록일시',
                            className: 'text-12',
                            render: (activity) => <div>{format(activity.createdAt, 'Pp', {locale: ko})}</div>,
                        },
                        {
                            th: '', // Action columns
                            className: 'text-12',
                            render: (activity) => <div></div>,
                        },
                    ]}
                />
            </LoadableBox>
        </div>
    );
});
