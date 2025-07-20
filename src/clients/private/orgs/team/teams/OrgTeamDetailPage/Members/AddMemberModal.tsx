import React, {memo, useEffect} from 'react';
import {useTranslation} from 'next-i18next';
import {useRecoilValue} from 'recoil';
import {orgIdParamState, teamIdParamState} from '^atoms/common';
import {teamMembershipApi} from '^models/TeamMembership/api';
import {TeamMemberSelectItem} from '^models/TeamMember/components/TeamMemberSelectItem';
import {useAddableTeamMemberListInAddTeamMemberModal} from '^models/TeamMember';
import {SlideUpAllSelectModal} from '^clients/private/_modals/SlideUpAllSelectModal';

interface AddMemberModalProps {
    isOpened: boolean;
    onClose: () => any;
    onCreate: () => any;
}

export const AddMemberModal = memo((props: AddMemberModalProps) => {
    const {t} = useTranslation('teams');
    const orgId = useRecoilValue(orgIdParamState);
    const teamId = useRecoilValue(teamIdParamState);
    const {isOpened, onClose, onCreate} = props;
    const {result, search, reset, isLoading} = useAddableTeamMemberListInAddTeamMemberModal();

    const fetchAddableTeamMembers = () => {
        if (!orgId || isNaN(orgId)) return;
        if (!teamId || isNaN(teamId)) return;

        search({
            relations: ['teams'],
            where: {organizationId: orgId},
            itemsPerPage: 0,
            order: {id: 'DESC'},
        });
    };

    const onSave = async (selectedIds: number[]) => {
        const requests = selectedIds.map((teamMemberId) => {
            return teamMembershipApi.create(orgId, {teamId, teamMemberId});
        });

        await Promise.allSettled(requests);
    };

    const availableTeamMembers = result.items.filter(({teams = []}) => {
        return teams.every((team) => team.id !== teamId);
    });

    useEffect(() => {
        isOpened ? fetchAddableTeamMembers() : reset();
    }, [isOpened]);

    return (
        <SlideUpAllSelectModal
            isOpened={isOpened}
            onClose={onClose}
            onCreate={onCreate}
            items={availableTeamMembers}
            getId={(item) => item.id}
            Row={({item, onClick, isSelected}) => (
                <TeamMemberSelectItem teamMember={item} onClick={onClick} isSelected={isSelected} />
            )}
            onSubmit={onSave}
            titleCaption={t('members.addMemberModal.caption') as string}
            title={t('members.addMemberModal.title') as string}
            ctaInactiveText={t('members.addMemberModal.ctaInactive') as string}
            ctaActiveText={t('members.addMemberModal.ctaActive') as string}
            successMessage={t('messages.memberAdded') as string}
            emptyText={t('members.addMemberModal.empty') as string}
        />
    );
});
