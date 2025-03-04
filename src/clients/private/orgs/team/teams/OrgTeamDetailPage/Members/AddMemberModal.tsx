import React, {memo, useEffect} from 'react';
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
            titleCaption="이미 이용중인 구성원은 제외했어요."
            title="이용중인 구성원을 모두 선택해주세요."
            ctaInactiveText="이용중인 구성원을 선택해주세요."
            ctaActiveText="%n명의 이용중인 구성원 연결하기"
            successMessage="선택한 구성원을 연결했어요."
        />
    );
});
