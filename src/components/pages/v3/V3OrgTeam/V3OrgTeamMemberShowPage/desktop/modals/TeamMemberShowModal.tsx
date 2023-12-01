import React, {memo} from 'react';
import {useModal} from '^v3/share/modals/useModal';
import {ModalTopbar} from '^v3/share/modals/ModalTopbar';
import {TeamMemberShowBody} from '^v3/V3OrgTeam/V3OrgTeamMemberShowPage/TeamMemberShowBody';
import {teamMemberShowModal} from '^v3/V3OrgTeam/V3OrgTeamMemberShowPage/desktop/modals/atom';

export const TeamMemberShowModal = memo(() => {
    const {Modal, close} = useModal(teamMemberShowModal);

    return (
        <Modal wrapperClassName="modal-right" className="p-0 max-w-none sm:max-w-[32rem] z-50">
            <ModalTopbar backBtnOnClick={close} topbarPosition="sticky" />
            <TeamMemberShowBody />
        </Modal>
    );
});
