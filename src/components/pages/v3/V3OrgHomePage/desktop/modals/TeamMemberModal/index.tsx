import React, {memo} from 'react';
import {useModal} from '^v3/share/modals/useModal';
import {subjectMemberAtom, teamMemberModal} from './atom';
import {ModalTopbar} from '^v3/share/modals/ModalTopbar';
import {MobileSection} from '^v3/share/sections/MobileSection';
import {useRecoilValue} from 'recoil';

export const TeamMemberModal = memo(function TeamMemberModal() {
    const {Modal, close} = useModal(teamMemberModal);
    const member = useRecoilValue(subjectMemberAtom);

    return (
        <Modal wrapperClassName="modal-right" className="p-0 max-w-none sm:max-w-[32rem]">
            <ModalTopbar backBtnOnClick={close} topbarPosition="sticky" />
            <MobileSection.List>{member?.name}</MobileSection.List>
        </Modal>
    );
});
