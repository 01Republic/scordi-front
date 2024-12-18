import {StatusCard} from '^clients/private/orgs/subscriptions/OrgSubscriptionDetailPage/components/StatusCard';
import {ListTable, ListTableContainer} from '^clients/private/_components/table/ListTable';
import React, {memo, useEffect, useState} from 'react';
import {RiUser3Fill, RiUserFollowFill, RiUserForbidFill, RiUserUnfollowFill} from 'react-icons/ri';
import {AddTeamMemberDropdown} from '^clients/private/orgs/team/team-members/OrgTeamMemberListPage/AddTeamMemberDropdown';
import {useTeamMembersInSubscriptionShowModal} from '^models/TeamMember';
import {useRecoilState, useRecoilValue} from 'recoil';
import {subscriptionSubjectAtom} from '^clients/private/orgs/subscriptions/OrgSubscriptionDetailPage/atom';
import {orgIdParamState} from '^atoms/common';
import {TeamMemberInSubscriptionTableRow} from '^clients/private/orgs/subscriptions/OrgSubscriptionDetailPage/components/TeamMemberInSubscriptionTableRow';
import {TeamMemberInSubscriptionTableHeader} from '^clients/private/orgs/subscriptions/OrgSubscriptionDetailPage/components/TeamMemberInSubscriptionTableHeader';
import {MemberStatusScopeHandler} from '^clients/private/orgs/subscriptions/OrgSubscriptionDetailPage/components/MemberStatusScopeHandler';
import {FaPlus} from 'react-icons/fa6';
import {TeamMemberSelect} from '^clients/private/orgs/subscriptions/OrgSubscriptionConnectsPage/ContentFunnels/inputs/TeamMemberSelect';
import {SlideUpModal} from '^components/modals/_shared/SlideUpModal';
import {SubscriptionTeamMemberSelect} from '^clients/private/orgs/subscriptions/OrgSubscriptionDetailPage/components/SubscriptionTeamMemberSelect';

export const SubscriptionMemberTab = memo(function SubscriptionMemberTab() {
    const orgId = useRecoilValue(orgIdParamState);
    const [subscription, setSubscription] = useRecoilState(subscriptionSubjectAtom);
    const {
        search,
        result,
        isLoading,
        isEmptyResult,
        isNotLoaded,
        query,
        searchAndUpdateCounter,
        movePage,
        changePageSize,
        reload,
        resetPage,
        orderBy,
    } = useTeamMembersInSubscriptionShowModal();
    const [isOpened, setIsOpened] = useState(false);

    const onReady = () => {
        search({
            where: {
                // @ts-ignore
                subscriptions: {id: subscription.id},
            },
            relations: ['teams', 'subscriptions'],
            order: {id: 'DESC'},
        });
    };

    const onClose = () => {
        setIsOpened(false);
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
                    title={'잔여 계정'}
                    titleValue={(subscription?.paidMemberCount
                        ? (subscription?.paidMemberCount || 0) - (subscription?.usedMemberCount || 0)
                        : 0
                    ).toString()}
                    icon={<RiUserFollowFill size={20} className="h-full w-full p-[6px] text-white" />}
                    iconColor={'bg-orange-400'}
                />
                {/* TODO 이 정보들 어케 알아 */}
                <StatusCard
                    title={'이번달 회수(예정) 계정'}
                    titleValue={(subscription?.paidMemberCount || 0).toString()}
                    icon={<RiUserUnfollowFill size={20} className="h-full w-full p-[6px] text-white" />}
                    iconColor={'bg-pink-400'}
                />
                {/* TODO 이 정보들 어케 알아 */}
                <StatusCard
                    title={'해지 완료된 계정'}
                    titleValue={(subscription?.paidMemberCount || 0).toString()}
                    icon={<RiUserForbidFill size={20} className="h-full w-full p-[6px] text-white" />}
                    iconColor={'bg-blue-400'}
                />
            </div>

            <div className={'flex justify-between'}>
                {/* TODO 클릭 시 해당 필터로 동작, 근데 멤버 상태를 알 수 없음 */}
                <MemberStatusScopeHandler onSearch={(status) => console.log(status)} />

                <button className={'btn btn-outline btn-sm text-14 bg-white'} onClick={() => setIsOpened(true)}>
                    <FaPlus /> 멤버 연결하기
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
                EmptyButtons={() => <AddTeamMemberDropdown reload={reload} />}
            >
                <ListTable
                    items={result.items}
                    isLoading={false}
                    Header={() => <TeamMemberInSubscriptionTableHeader orderBy={orderBy} />}
                    Row={({item}) => <TeamMemberInSubscriptionTableRow teamMember={item} reload={reload} />}
                />
            </ListTableContainer>

            <SlideUpModal open={isOpened} onClose={onClose} size="md">
                <p
                    className={'text-lg bold mb-4'}
                >{`${subscription?.product.nameKo}을 이용중인 구성원을 연결하세요.`}</p>
                <SubscriptionTeamMemberSelect onSelected={() => setIsOpened(false)} />
            </SlideUpModal>
        </div>
    );
});
