import React, {memo, useEffect} from 'react';
import {useRecoilValue} from 'recoil';
import {orgIdParamState} from '^atoms/common';
import {subscriptionApi} from '^models/Subscription/api';
import {useTeamMemberListInCreateSubscription} from '^models/TeamMember';
import {TeamMemberSelectItem} from '^models/TeamMember/components/TeamMemberSelectItem';
import {useSubscriptionSeatsInMemberTab} from '^models/SubscriptionSeat/hook/useSubscriptionSeats';
import {subscriptionSubjectAtom} from '^clients/private/orgs/subscriptions/OrgSubscriptionDetailPage/atom';
import {SlideUpAllSelectModal} from '^clients/private/_modals/SlideUpAllSelectModal';

interface SubscriptionTeamMemberSelectModalProps {
    isOpened: boolean;
    onClose: () => any;
    onCreate?: () => any;
}

export const SubscriptionTeamMemberSelectModal = memo((props: SubscriptionTeamMemberSelectModalProps) => {
    const orgId = useRecoilValue(orgIdParamState);
    const subscription = useRecoilValue(subscriptionSubjectAtom);
    const {isOpened, onClose, onCreate} = props;
    const {search, result} = useSubscriptionSeatsInMemberTab();

    const {result: teamMemberList, search: teamMemberSearch} = useTeamMemberListInCreateSubscription();

    if (!orgId || !subscription) return null;

    const handleUpdate = async (selectedIds: number[]) => {
        const requests = selectedIds.map((teamMemberId) => {
            return subscriptionApi.seatsApi.create(orgId, subscription.id, {teamMemberId: teamMemberId});
        });

        await Promise.allSettled(requests);
    };

    const filterTeamMemberSeatList = teamMemberList.items.filter(
        (teamMember) => !result.items.find((seat) => seat.teamMember?.id === teamMember.id),
    );

    useEffect(() => {
        search({});
        teamMemberSearch({itemsPerPage: 0});
    }, []);

    return (
        <SlideUpAllSelectModal
            isOpened={isOpened}
            onClose={onClose}
            onCreate={onCreate}
            items={filterTeamMemberSeatList}
            getId={(item) => item.id}
            Row={({item, onClick, isSelected}) => (
                <TeamMemberSelectItem teamMember={item} onClick={onClick} isSelected={isSelected} />
            )}
            onSubmit={handleUpdate}
            titleCaption="이미 이용중인 구성원은 제외했어요."
            title="이용중인 구성원을 모두 선택해주세요."
            ctaInactiveText="이용중인 구성원을 선택해주세요."
            ctaActiveText="%n명의 이용중인 구성원 연결하기"
            successMessage="선택한 구성원을 연결했어요."
            emptyText="연결할 구성원이 없어요"
        />
    );
});
