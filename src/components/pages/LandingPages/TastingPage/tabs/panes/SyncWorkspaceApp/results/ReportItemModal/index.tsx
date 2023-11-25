import React, {memo} from 'react';
import {MobileSection} from '^components/pages/v3/share/sections/MobileSection';
import {useModal} from '^v3/share/modals/useModal';
import {ModalTopbar} from '^v3/share/modals/ModalTopbar';
import {reportItemModalIsShow} from '../../atom';
import {ReportItemModalHeader} from './Header';
import {ReportItemModalBody} from './Body';
import {ReportItemModalCTAButton} from './ModalCTAButton';

export const ReportItemModal = memo(function ReportItemModal() {
    const {Modal, close} = useModal({isShowAtom: reportItemModalIsShow});

    return (
        <Modal wrapperClassName="modal-right" className="p-0 max-w-none sm:max-w-[32rem]">
            <ModalTopbar backBtnOnClick={close} topbarPosition="sticky" />

            <MobileSection.List>
                <ReportItemModalHeader />
                <ReportItemModalBody />
                <ReportItemModalCTAButton />
            </MobileSection.List>
        </Modal>
    );
});
