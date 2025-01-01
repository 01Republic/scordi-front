import {StatusCard} from '^clients/private/orgs/subscriptions/OrgSubscriptionDetailPage/components/StatusCard';
import {ListTable, ListTableContainer} from '^clients/private/_components/table/ListTable';
import React, {memo, useEffect, useState} from 'react';
import {RiUser3Fill, RiUserFollowFill, RiUserForbidFill, RiUserUnfollowFill} from 'react-icons/ri';
import {useRecoilValue} from 'recoil';
import {subscriptionSubjectAtom} from '^clients/private/orgs/subscriptions/OrgSubscriptionDetailPage/atom';
import {orgIdParamState} from '^atoms/common';
import {TeamMemberInSubscriptionTableRow} from '^clients/private/orgs/subscriptions/OrgSubscriptionDetailPage/components/TeamMemberInSubscriptionTableRow';
import {TeamMemberInSubscriptionTableHeader} from '^clients/private/orgs/subscriptions/OrgSubscriptionDetailPage/components/TeamMemberInSubscriptionTableHeader';
import {MemberStatusScopeHandler} from '^clients/private/orgs/subscriptions/OrgSubscriptionDetailPage/components/MemberStatusScopeHandler';
import {FaPlus} from 'react-icons/fa6';
import {SubscriptionTeamMemberSelectModal} from '^clients/private/orgs/subscriptions/OrgSubscriptionDetailPage/components/selects/SubscriptionTeamMemberSelect';
import {useSubscriptionSeatsInMemberTab} from '^models/SubscriptionSeat/hook/useSubscriptionSeats';

export const SubscriptionMemberTab = memo(function SubscriptionMemberTab() {
    const orgId = useRecoilValue(orgIdParamState);
    const subscription = useRecoilValue(subscriptionSubjectAtom);
    const {search, result, isLoading, isEmptyResult, isNotLoaded, movePage, changePageSize, reload, orderBy} =
        useSubscriptionSeatsInMemberTab();
    const [isOpened, setIsOpened] = useState(false);

    if (!orgId || !subscription) return null;

    const onReady = () => {
        search({
            relations: ['teamMember', 'teamMember.teams'],
            order: {id: 'DESC'},
        });
    };

    const onClose = () => {
        setIsOpened(false);
        reload();
    };

    const willRemoveSeatCount = () => {
        const willRemoveSeats = (subscription.subscriptionSeats || []).filter(
            (seat) => !!seat.finishAt && seat.finishAt.getMonth() === new Date().getMonth(),
        );
        return willRemoveSeats.length;
    };

    const removedSeatCount = () => {
        const willRemoveSeats = (subscription.subscriptionSeats || []).filter(
            (seat) => !!seat.finishAt && seat.finishAt < new Date(),
        );
        return willRemoveSeats.length;
    };

    useEffect(() => {
        orgId && onReady();
    }, [orgId]);

    return (
        <div className={'py-4 space-y-4'}>
            <div className={'bg-gray-200 grid grid-cols-4 p-4 space-x-4 rounded'}>
                <StatusCard
                    title={'현재 할당된 계정'}
                    titleValue={(subscription?.usedMemberCount || 0).toString()}
                    icon={<RiUser3Fill size={20} className="h-full w-full p-[6px] text-white" />}
                    iconColor={'bg-purple-400'}
                />
                <StatusCard
                    title={'구매한 계정'}
                    titleValue={(subscription?.subscriptionSeats?.length || 0).toString()}
                    icon={<RiUserFollowFill size={20} className="h-full w-full p-[6px] text-white" />}
                    iconColor={'bg-orange-400'}
                />
                <StatusCard
                    title={'이번달 회수(예정) 계정'}
                    titleValue={willRemoveSeatCount().toString()}
                    icon={<RiUserUnfollowFill size={20} className="h-full w-full p-[6px] text-white" />}
                    iconColor={'bg-pink-400'}
                />
                <StatusCard
                    title={'해지 완료된 계정'}
                    titleValue={removedSeatCount().toString()}
                    icon={<RiUserForbidFill size={20} className="h-full w-full p-[6px] text-white" />}
                    iconColor={'bg-blue-400'}
                />
            </div>

            <div className={'flex justify-between'}>
                {/* TODO 클릭 시 해당 필터로 동작, 근데 멤버 상태를 알 수 없음 */}
                <MemberStatusScopeHandler onSearch={(status) => console.log(status)} />

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
                    Header={() => <TeamMemberInSubscriptionTableHeader orderBy={orderBy} />}
                    Row={({item}) => <TeamMemberInSubscriptionTableRow seat={item} reload={reload} />}
                />
            </ListTableContainer>

            <SubscriptionTeamMemberSelectModal isOpened={isOpened} onClose={onClose} />
        </div>
    );
});
