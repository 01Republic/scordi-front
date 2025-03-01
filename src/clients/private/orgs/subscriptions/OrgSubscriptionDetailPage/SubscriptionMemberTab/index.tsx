import {StatusCard} from '^clients/private/orgs/subscriptions/OrgSubscriptionDetailPage/SubscriptionInfoTab/StatusCard';
import {ListTable, ListTableContainer} from '^clients/private/_components/table/ListTable';
import React, {memo, useEffect, useState} from 'react';
import {useRecoilValue} from 'recoil';
import {useCurrentSubscription} from '^clients/private/orgs/subscriptions/OrgSubscriptionDetailPage/atom';
import {orgIdParamState} from '^atoms/common';
import {TeamMemberInSubscriptionTableRow} from '^clients/private/orgs/subscriptions/OrgSubscriptionDetailPage/SubscriptionMemberTab/TeamMemberInSubscriptionTableRow';
import {TeamMemberInSubscriptionTableHeader} from '^clients/private/orgs/subscriptions/OrgSubscriptionDetailPage/SubscriptionMemberTab/TeamMemberInSubscriptionTableHeader';
import {MemberStatusScopeHandler} from '^clients/private/orgs/subscriptions/OrgSubscriptionDetailPage/SubscriptionMemberTab/MemberStatusScopeHandler';
import {FaPlus} from 'react-icons/fa6';
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

    useEffect(() => {
        orgId && onPageReload();
    }, [orgId]);

    return (
        <div className={'py-4 space-y-4'}>
            <SubscriptionSeatStatusSection />

            <div className={'flex justify-between'}>
                <MemberStatusScopeHandler onSearch={onChangeScopeHandler} />
                <button className={'btn btn-outline btn-sm text-14 bg-white'} onClick={() => setIsOpened(true)}>
                    <FaPlus />
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
                        <FaPlus />
                        &nbsp;멤버 연결하기
                    </button>
                )}
            >
                <ListTable
                    items={result.items}
                    isLoading={false}
                    addBottomPadding={true}
                    Header={() => <TeamMemberInSubscriptionTableHeader orderBy={orderBy} />}
                    Row={({item}) => <TeamMemberInSubscriptionTableRow seat={item} reload={onPageReload} />}
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
