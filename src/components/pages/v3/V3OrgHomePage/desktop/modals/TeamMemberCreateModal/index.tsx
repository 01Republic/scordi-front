import React, {memo} from 'react';
import {useModal} from '^v3/share/modals/useModal';
import {teamMemberCreateModal} from '^v3/V3OrgHomePage/desktop/modals/TeamMemberCreateModal/atom';
import {ModalTopbar} from '^v3/share/modals/ModalTopbar';
import {MobileSection} from '^v3/share/sections/MobileSection';

export const TeamMemberCreateModal = memo(function TeamMemberCreateModal() {
    const {Modal, close} = useModal(teamMemberCreateModal);

    return (
        <Modal wrapperClassName="modal-right" className="p-0 max-w-none sm:max-w-[32rem]">
            <ModalTopbar backBtnOnClick={close} topbarPosition="sticky" />
            <MobileSection.List>hihi</MobileSection.List>
        </Modal>
    );
});
