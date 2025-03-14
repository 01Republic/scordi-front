import React, {memo} from 'react';
import {MobileSection} from '^v3/share/sections/MobileSection';
import {isOpenLoadingModalAtom} from '^v3/share/modals/NewTeamMemberModal/InviteMemberModal';
import {ModalTopbar, useModal} from '^v3/share/modals';
import {Loader} from 'lucide-react';

export const LoadingModal = memo(() => {
    const {Modal, close} = useModal({isShowAtom: isOpenLoadingModalAtom});

    return (
        <Modal wrapperClassName="modal-right" className="p-0 max-w-none sm:max-w-[32rem] z-50">
            <ModalTopbar backBtnOnClick={close} topbarPosition="sticky" />

            <MobileSection.Padding className="text-center py-28">
                <Loader size={60} className="animate-spin text-scordi-500 mb-10 m-auto" />

                <div className="py-3 w-full bg-scordi-100 text-scordi-600 rounded-lg text-lg font-semibold animate-pulse inline-block">
                    초대 이메일을 발송중입니다. 잠시만 기다려주세요
                </div>
            </MobileSection.Padding>
        </Modal>
    );
});
