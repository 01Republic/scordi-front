import {StatusCard} from '^clients/private/orgs/subscriptions/OrgSubscriptionDetailPage/SubscriptionInfoTab/StatusCard';
import {ListTable, ListTableContainer} from '^clients/private/_components/table/ListTable';
import React, {memo, useEffect, useState} from 'react';
import {useRecoilValue} from 'recoil';
import {toast} from 'react-hot-toast';
import {MinusCircle, Plus} from 'lucide-react';
import {confirm2, confirmed} from '^components/util/dialog';
import {ApiError, errorToast} from '^api/api';
import {subscriptionApi} from '^models/Subscription/api';
import {useCurrentSubscription} from '^clients/private/orgs/subscriptions/OrgSubscriptionDetailPage/atom';
import {orgIdParamState} from '^atoms/common';
import {TeamMemberInSubscriptionTableRow} from '^clients/private/orgs/subscriptions/OrgSubscriptionDetailPage/SubscriptionMemberTab/TeamMemberInSubscriptionTableRow';
import {TeamMemberInSubscriptionTableHeader} from '^clients/private/orgs/subscriptions/OrgSubscriptionDetailPage/SubscriptionMemberTab/TeamMemberInSubscriptionTableHeader';
import {MemberStatusScopeHandler} from '^clients/private/orgs/subscriptions/OrgSubscriptionDetailPage/SubscriptionMemberTab/MemberStatusScopeHandler';
import {SubscriptionTeamMemberSelectModal} from '^clients/private/orgs/subscriptions/OrgSubscriptionDetailPage/SubscriptionMemberTab/SubscriptionTeamMemberSelect';
import {useSubscriptionSeatsInMemberTab} from '^models/SubscriptionSeat/hook/useSubscriptionSeats';
import {SubscriptionSeatStatus} from '^models/SubscriptionSeat/type';
import {SubscriptionSeatStatusSection} from '^clients/private/orgs/subscriptions/OrgSubscriptionDetailPage/SubscriptionMemberTab/SubscriptionSeatStatusSection';
import {useAssignedSeatCounter} from '^clients/private/orgs/subscriptions/OrgSubscriptionDetailPage/SubscriptionMemberTab/SubscriptionSeatStatusSection/AssignedSeatCounter';
import {useFinishTargetSeatCounter} from '^clients/private/orgs/subscriptions/OrgSubscriptionDetailPage/SubscriptionMemberTab/SubscriptionSeatStatusSection/FinishTargetSeatCounter';
import {usePaidSeatCounter} from '^clients/private/orgs/subscriptions/OrgSubscriptionDetailPage/SubscriptionMemberTab/SubscriptionSeatStatusSection/PaidSeatCounter';
import {useQuitStatusSeatCounter} from '^clients/private/orgs/subscriptions/OrgSubscriptionDetailPage/SubscriptionMemberTab/SubscriptionSeatStatusSection/QuitStatusSeatCounter';

export const SubscriptionMemberTab = memo(function SubscriptionMemberTab() {
    const orgId = useRecoilValue(orgIdParamState);
    const {currentSubscription: subscription, reload: reloadSubscription} = useCurrentSubscription();
    const {search, result, isLoading, isEmptyResult, isNotLoaded, movePage, changePageSize, reload, orderBy} =
        useSubscriptionSeatsInMemberTab();
    const [isOpened, setIsOpened] = useState(false);
    const {refetch: refetchAssignedSeatCount} = useAssignedSeatCounter(subscription);
    const {refetch: refetchPaidSeatCount} = usePaidSeatCounter(subscription);
    const {refetch: refetchFinishTargetSeatCounter} = useFinishTargetSeatCounter(subscription);
    const {refetch: refetchQuitStatusSeatCount} = useQuitStatusSeatCounter(subscription);

    const [selectedMembers, setSelectedMembers] = useState<number[]>([]);

    if (!orgId || !subscription) return <></>;

    const onClose = () => {
        setIsOpened(false);
        onPageReload();
    };

    const onPageReload = () => {
        reload();
        reloadSubscription();
        refetchAssignedSeatCount();
        refetchPaidSeatCount();
        refetchFinishTargetSeatCounter();
        refetchQuitStatusSeatCount();
    };

    const onChangeScopeHandler = (status: SubscriptionSeatStatus | null) => {
        if (!status) {
            search({
                order: {id: 'DESC'},
            });
        } else
            search({
                order: {id: 'DESC'},
                where: {status},
            });
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
                            await Promise.all(
                                targetMembers.map((id) => subscriptionApi.seatsApi.destroy(orgId, subscription.id, id)),
                            );
                            setSelectedMembers([]);
                            toast.success('삭제했습니다');
                            reload();
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

    useEffect(() => {
        orgId && onPageReload();
    }, [orgId]);

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
                pagination={result.pagination}
                movePage={movePage}
                changePageSize={changePageSize}
                unit="명"
                isNotLoaded={isNotLoaded}
                isLoading={isLoading}
                isEmptyResult={isEmptyResult}
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
                    items={result.items}
                    isLoading={false}
                    addBottomPadding={true}
                    Header={() => <TeamMemberInSubscriptionTableHeader orderBy={orderBy} />}
                    Row={({item}) => (
                        <TeamMemberInSubscriptionTableRow
                            seat={item}
                            reload={onPageReload}
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
                    reload();
                }}
            />
        </div>
    );
});
