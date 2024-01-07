import React, {memo} from 'react';
import {newTeamMemberModal} from '^v3/share/modals/NewTeamMemberModal/atom';
import {ModalTopbar, useModal} from '^v3/share/modals';
import {MobileSection} from '../../sections/MobileSection';
import {isOpenNewTeamMemberModalAtom} from 'src/components/pages/v3/share/modals/NewTeamMemberModal/CreateTeamMemberModal';
import {TeamMemberCreateModal} from '^v3/V3OrgHomePage/TeamMemberCreateModal';
import {
    InviteOrgMemberModal,
    isOpenInviteOrgMemberModalAtom,
} from 'src/components/pages/v3/share/modals/NewTeamMemberModal/InviteMemberModal';

export const NewTeamMemberModal = memo(() => {
    const {Modal, close} = useModal(newTeamMemberModal);
    const {open: openCreateMemberModal} = useModal({isShowAtom: isOpenNewTeamMemberModalAtom});
    const {open: openInviteMemberModal} = useModal({isShowAtom: isOpenInviteOrgMemberModalAtom});

    return (
        <>
            <Modal wrapperClassName="modal-right" className="p-0 max-w-none sm:max-w-[32rem] flex flex-col">
                <ModalTopbar backBtnOnClick={close} topbarPosition="sticky" />
                <MobileSection.Padding className="flex-1">
                    <div className="flex flex-col gap-20 h-full">
                        <div className="pt-5">
                            <h2 className="h1 leading-tight">어떤 방법으로 초대할까요?</h2>
                        </div>

                        <div className="flex-1 pt-16">
                            <div className="flex flex-col gap-4 sm:gap-2">
                                <button
                                    onClick={() => openInviteMemberModal()}
                                    className="btn btn-block btn-lg border border-gray-200"
                                >
                                    구글 워크스페이스 이메일로 한꺼번에 초대하기
                                </button>

                                <button
                                    onClick={() => openCreateMemberModal()}
                                    className="btn btn-block btn-md btn-link "
                                >
                                    그냥 직접 입력할래요
                                </button>
                            </div>
                        </div>
                    </div>
                </MobileSection.Padding>
            </Modal>
            <TeamMemberCreateModal />
            <InviteOrgMemberModal />
        </>
    );
});
