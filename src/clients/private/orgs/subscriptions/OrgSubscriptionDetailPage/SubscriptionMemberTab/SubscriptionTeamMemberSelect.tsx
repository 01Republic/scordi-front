import React, {memo, useEffect, useState} from 'react';
import {toast} from 'react-hot-toast';
import {
    TeamMemberCreateAutoModal,
    TeamMemberCreateManualModal,
    TeamMemberCreateMethodModal,
} from '^clients/private/_modals/team-members';
import {TeamMemberSearchInput} from '^clients/private/orgs/subscriptions/OrgSubscriptionConnectsPage/ContentFunnels/inputs/TeamMemberSelect/TeamMemberSearchInput';
import {TeamMemberSelectableSection} from '^clients/private/orgs/subscriptions/OrgSubscriptionConnectsPage/ContentFunnels/inputs/TeamMemberSelect/TeamMemberSelectableSection';
import {useListOf} from '^hooks/useResource';
import {selectedTeamMembersAtom} from '^clients/private/orgs/subscriptions/OrgSubscriptionConnectsPage/ContentFunnels/inputs/TeamMemberSelect/atom';
import {useRecoilValue, useSetRecoilState} from 'recoil';
import {FaTimes} from 'react-icons/fa';
import {updateCurrentSubscriptionState} from '^v3/V3OrgAppShowPage/atom';
import {Button} from '^components/util/form-control/inputs/ButtonGroupRadio/Button';
import {subscriptionApi} from '^models/Subscription/api';
import {subscriptionSubjectAtom} from '^clients/private/orgs/subscriptions/OrgSubscriptionDetailPage/atom';
import {SlideUpModal} from '^components/modals/_shared/SlideUpModal';
import {orgIdParamState} from '^atoms/common';
import {useSubscriptionSeatsInMemberTab} from '^models/SubscriptionSeat/hook/useSubscriptionSeats';
import {SlideUpSelectModal} from '^clients/private/_modals/SlideUpSelectModal';
import {CreditCardSelectItem} from '^models/CreditCard/components/CreditCardSelectItem';
import {TeamMemberSelectItem} from '^models/TeamMember/components/TeamMemberSelectItem';
import {useTeamMemberListInCreateSubscription} from '^models/TeamMember';

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
            subscriptionApi.seatsApi.create(orgId, subscription.id, {teamMemberId: teamMemberId});
        });

        await Promise.all(requests);
    };

    const filterTeamMemberSeatList = teamMemberList.items.filter(
        (teamMember) => !result.items.find((seat) => seat.teamMember?.id === teamMember.id),
    );

    useEffect(() => {
        search({});
        teamMemberSearch({});
    }, []);

    return (
        <SlideUpSelectModal
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
            toastMessage="선택한 구성원을 연결했어요."
        />
    );
});
