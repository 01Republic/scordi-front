import React, {memo, useEffect} from 'react';
import {useModal} from '^v3/share/modals/useModal';
import {ModalTopbar} from '^v3/share/modals/ModalTopbar';
import {atom, useRecoilValue} from 'recoil';
import {TeamMemberShowBody} from '^v3/V3OrgTeam/V3OrgTeamMemberShowPage/TeamMemberShowBody';
import {useCurrentTeamMember} from '^models/TeamMember/hook';
import {currentMemberIdState} from '^models/TeamMember/atom';
import {orgIdParamState} from '^atoms/common';

export const teamMemberShowModal = {
    isShowAtom: atom({
        key: 'v3/teamMemberShowModal',
        default: false,
    }),
    popStateSyncKey: 'teamMemberShowModal',
};

export const TeamMemberShowModal = memo(() => {
    const {Modal, close} = useModal(teamMemberShowModal);
    const {loadCurrentTeamMember, currentTeamMember} = useCurrentTeamMember();
    const orgId = useRecoilValue(orgIdParamState);
    const memberId = useRecoilValue(currentMemberIdState);

    useEffect(() => {
        if (!orgId || isNaN(orgId) || !memberId || isNaN(memberId)) return;

        loadCurrentTeamMember(orgId, memberId);
    }, [memberId]);

    return (
        <Modal wrapperClassName="modal-right" className="p-0 max-w-none sm:max-w-[32rem] z-50">
            <ModalTopbar backBtnOnClick={close} topbarPosition="sticky" />
            <TeamMemberShowBody />
        </Modal>
    );
});
