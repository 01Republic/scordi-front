import React, {memo, useEffect} from 'react';
import {useRecoilValue} from 'recoil';
import {orgIdParamState, useIdParam, useOrgIdParam} from '^atoms/common';
import {useTeamMembers2} from '^models/TeamMember';
import {useCreateSubscriptionSeat, useSubscriptionSeat} from '^models/SubscriptionSeat/hook';
import {TeamMemberSelectItem} from '^models/TeamMember/components/TeamMemberSelectItem';
import {SlideUpAllSelectModal} from '^clients/private/_modals/SlideUpAllSelectModal';
import {subscriptionSubjectAtom} from '^clients/private/orgs/subscriptions/OrgSubscriptionDetailPage/atom';

interface SubscriptionTeamMemberSelectModalProps {
    isOpened: boolean;
    onClose: () => any;
    onCreate?: () => any;
}

export const SubscriptionTeamMemberSelectModal = memo((props: SubscriptionTeamMemberSelectModalProps) => {
    const orgId = useOrgIdParam();
    const id = useIdParam('subscriptionId');
    const subscription = useRecoilValue(subscriptionSubjectAtom);
    const {isOpened, onClose, onCreate} = props;
    const {mutateAsync: createSubscriptionSeat} = useCreateSubscriptionSeat(orgId, id);
    const {data: subscriptionSeat} = useSubscriptionSeat(orgId, id, {itemsPerPage: 0});
    const {result: teamMemberList} = useTeamMembers2(orgId, {
        itemsPerPage: 0,
    });

    if (!subscription) return <></>;

    if (!orgId || !subscription) return null;

    const handleUpdate = async (selectedIds: number[]) => {
        const requests = selectedIds.map((teamMemberId) => {
            return createSubscriptionSeat({teamMemberId: teamMemberId});
        });

        await Promise.allSettled(requests);
    };

    const filterTeamMemberSeatList = teamMemberList.items.filter(
        (teamMember) => !subscriptionSeat.items.some((seat) => seat.teamMember?.id === teamMember.id),
    );

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
