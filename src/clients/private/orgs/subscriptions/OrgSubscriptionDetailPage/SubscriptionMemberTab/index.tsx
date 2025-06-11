import React, {memo, useState} from 'react';
import {useRecoilValue} from 'recoil';
import {toast} from 'react-hot-toast';
import {MinusCircle, Plus} from 'lucide-react';
import {confirm2, confirmed} from '^components/util/dialog';
import {ApiError, errorToast} from '^api/api';
import {orgIdParamState} from '^atoms/common';
import {SubscriptionSeatStatus} from '^models/SubscriptionSeat/type';
import {useDestroyAllSubscriptionSeat, useSubscriptionSeat} from '^models/SubscriptionSeat/hook';
import {useCurrentSubscription} from '^clients/private/orgs/subscriptions/OrgSubscriptionDetailPage/atom';
import {ListTable, ListTableContainer} from '^clients/private/_components/table/ListTable';
import {MemberStatusScopeHandler} from '../SubscriptionMemberTab/MemberStatusScopeHandler';
import {SubscriptionSeatStatusSection} from '../SubscriptionMemberTab/SubscriptionSeatStatusSection';
import {TeamMemberInSubscriptionTableHeader} from './TeamMemberInSubscriptionTableHeader';
import {TeamMemberInSubscriptionTableRow} from './TeamMemberInSubscriptionTableRow';
import {SubscriptionTeamMemberSelectModal} from './SubscriptionTeamMemberSelect';
import Qs from 'qs';

export const SubscriptionMemberTab = memo(function SubscriptionMemberTab() {
    const orgId = useRecoilValue(orgIdParamState);
    const {currentSubscription: subscription} = useCurrentSubscription();

    if (!orgId || !subscription) return <></>;

    const {
        query,
        setQuery,
        data: subscriptionSeat,
        isLoading,
        isFetched,
        sortVal,
        orderBy,
    } = useSubscriptionSeat(orgId, subscription.id);
    const {mutateAsync: destroySubscriptionSeat} = useDestroyAllSubscriptionSeat();
    const [selectedMembers, setSelectedMembers] = useState<number[]>([]);
    const [isOpened, setIsOpened] = useState(false);

    const teamMembers = subscriptionSeat?.items.filter((item) => item.teamMember);

    const onChangeScopeHandler = (status: SubscriptionSeatStatus | null) => {
        setSelectedMembers([]);

        if (!status) {
            setQuery({
                relations: ['teamMember', 'teamMember.teams'],
                order: {id: 'DESC'},
            });
        } else
            setQuery({
                ...query,
                order: {id: 'DESC'},
                where: {status},
            });
    };

    // const orderBy = async (sortKey: string, value: 'ASC' | 'DESC'): Promise<void> => {
    //     console.log('value', value);
    //
    //     setQuery((prev) => ({
    //         ...prev,
    //         page: 1,
    //         order: Qs.parse(`${sortKey}=${value}`),
    //     }));
    // };

    const changePageSize = (itemsPerPage: number) => {
        setQuery((prev) => ({
            ...prev,
            page: 1,
            itemsPerPage,
        }));
    };

    const movePage = (page: number) => {
        setQuery((prev) => ({
            ...prev,
            page,
        }));
    };

    const onDeleteMembers = (targetMembers: number[]) => {
        confirmed(
            confirm2(
                `구독 연결을 해제할까요?`,
                <span>
                    이 작업은 취소할 수 없습니다.
                    <br />
                    <b>선택한 멤버가 구독에서 제외</b>됩니다. <br />
                    그래도 연결을 해제 하시겠어요?
                </span>,
                'warning',
                {
                    showLoaderOnConfirm: true,
                    preConfirm: async () => {
                        try {
                            await destroySubscriptionSeat({orgId, subscriptionId: subscription.id, ids: targetMembers});
                            setSelectedMembers([]);
                            toast.success('계정을 회수했어요.');
                        } catch (e) {
                            errorToast(e as ApiError);
                        }
                    },
                    customClass: {
                        loader: 'mx-auto',
                    },
                },
            ),
        ).catch(errorToast);
    };

    return (
        <div className={'py-4 space-y-4'}>
            <SubscriptionSeatStatusSection />

            <div className={'flex justify-between'}>
                <MemberStatusScopeHandler onSearch={onChangeScopeHandler} />
                <button className={'btn btn-outline btn-sm text-14 bg-white'} onClick={() => setIsOpened(true)}>
                    <Plus />
                    &nbsp;멤버 연결하기
                </button>
            </div>

            <ListTableContainer
                pagination={subscriptionSeat.pagination}
                movePage={movePage}
                changePageSize={changePageSize}
                unit="명"
                isNotLoaded={!isFetched}
                isLoading={isLoading}
                isEmptyResult={subscriptionSeat.pagination.totalItemCount === 0 && !isLoading}
                emptyMessage="조회된 구성원이 없어요."
                emptyButtonText="구성원 등록"
                EmptyButtons={() => (
                    <button className={'btn btn-outline btn-sm text-14 bg-white'} onClick={() => setIsOpened(true)}>
                        <Plus />
                        &nbsp;멤버 연결하기
                    </button>
                )}
                TopMenu={
                    selectedMembers.length > 0
                        ? () => (
                              <div className="flex items-stretch border border-gray-200 rounded-md shadow-sm">
                                  <div className="text-sm py-1 px-2">{`${selectedMembers.length}명 선택됨`}</div>
                                  <button
                                      onClick={() => onDeleteMembers(selectedMembers)}
                                      className="border-l border-gray-200 py-1 px-2 hover:bg-gray-100"
                                  >
                                      <MinusCircle className="size-4 text-red-500" />
                                  </button>
                              </div>
                          )
                        : undefined
                }
            >
                <ListTable
                    items={teamMembers}
                    isLoading={false}
                    Header={() => (
                        <TeamMemberInSubscriptionTableHeader
                            sortVal={sortVal}
                            orderBy={orderBy}
                            allSelected={selectedMembers.length > 0 && selectedMembers.length === teamMembers.length}
                            onAllSelect={() =>
                                setSelectedMembers((prev) =>
                                    prev.length === teamMembers.length ? [] : teamMembers.map((item) => item.id),
                                )
                            }
                        />
                    )}
                    Row={({item}) => (
                        <TeamMemberInSubscriptionTableRow
                            key={item.id}
                            seat={item}
                            reload={() => {}}
                            selected={selectedMembers.includes(item.id)}
                            onSelect={(value: boolean) =>
                                setSelectedMembers((prev) =>
                                    value ? [...prev, item.id] : prev.filter((v) => v !== item.id),
                                )
                            }
                            onDelete={() => onDeleteMembers([item.id])}
                        />
                    )}
                />
            </ListTableContainer>

            <SubscriptionTeamMemberSelectModal
                isOpened={isOpened}
                onClose={() => {
                    setIsOpened(false);
                }}
                onCreate={() => {
                    setIsOpened(false);
                }}
            />
        </div>
    );
});
