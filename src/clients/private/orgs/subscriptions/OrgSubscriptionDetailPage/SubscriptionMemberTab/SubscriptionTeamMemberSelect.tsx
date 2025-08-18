import {orgIdParamState} from '^atoms/common';
import {SlideUpAllSelectModal} from '^clients/private/_modals/SlideUpAllSelectModal';
import {subscriptionSubjectAtom} from '^clients/private/orgs/subscriptions/OrgSubscriptionDetailPage/atom';
import {useCreateSubscriptionSeat, useSubscriptionSeat} from '^models/SubscriptionSeat/hook';
import {useTeamMembers2} from '^models/TeamMember';
import {TeamMemberSelectItem} from '^models/TeamMember/components/TeamMemberSelectItem';
import {useTranslation} from 'next-i18next';
import {memo} from 'react';
import {useRecoilValue} from 'recoil';

interface SubscriptionTeamMemberSelectModalProps {
    isOpened: boolean;
    onClose: () => any;
    onCreate?: () => any;
}

export const SubscriptionTeamMemberSelectModal = memo((props: SubscriptionTeamMemberSelectModalProps) => {
    const {t} = useTranslation('subscription');
    const orgId = useRecoilValue(orgIdParamState);
    const subscription = useRecoilValue(subscriptionSubjectAtom);
    const {isOpened, onClose, onCreate} = props;
    const {mutateAsync: createSubscriptionSeat} = useCreateSubscriptionSeat();

    if (!subscription) return <></>;
    const {data: subscriptionSeat} = useSubscriptionSeat(orgId, subscription?.id);
    const {result: teamMemberList} = useTeamMembers2(orgId, {
        itemsPerPage: 0,
    });

    if (!orgId || !subscription) return null;

    const handleUpdate = async (selectedIds: number[]) => {
        const requests = selectedIds.map((teamMemberId) => {
            return createSubscriptionSeat({orgId, subscriptionId: subscription.id, dto: {teamMemberId: teamMemberId}});
        });

        await Promise.allSettled(requests);
    };

    const filterTeamMemberSeatList = teamMemberList.items.filter(
        (teamMember) => !subscriptionSeat.items.find((seat) => seat.teamMember?.id === teamMember.id),
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
            titleCaption={t('detail.memberSelect.titleCaption') as string}
            title={t('detail.memberSelect.title') as string}
            ctaInactiveText={t('detail.memberSelect.ctaInactiveText') as string}
            ctaActiveText={t('detail.memberSelect.ctaActiveText') as string}
            successMessage={t('detail.memberSelect.successMessage') as string}
            emptyText={t('detail.memberSelect.emptyText') as string}
        />
    );
});
