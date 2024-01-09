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
import {HiLink, HiOutlineEnvelope} from 'react-icons/hi2';
import {useToast} from '^hooks/useToast';
import {useRecoilValue} from 'recoil';
import {orgIdParamState} from '^atoms/common';

export const NewTeamMemberModal = memo(() => {
    const {Modal, close} = useModal(newTeamMemberModal);
    const {open: openCreateMemberModal} = useModal({isShowAtom: isOpenNewTeamMemberModalAtom});
    const {open: openInviteMemberModal} = useModal({isShowAtom: isOpenInviteOrgMemberModalAtom});
    const {toast} = useToast();
    const orgId = useRecoilValue(orgIdParamState);
    const link = `https://scordi.io:8080/v3/orgs/${orgId}/join`;

    const onCopy = () => {
        if (!link) return;

        navigator.clipboard.writeText(link);
        toast.success('클립보드에 복사했습니다.');
    };

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
                                <InviteButton
                                    onClick={() => openInviteMemberModal()}
                                    title="구글 워크스페이스 이메일로 초대장 보내기"
                                    desc="초대장을 이메일로 발송할 수 있습니다."
                                    type={InviteStatus.Email}
                                />
                                <InviteButton
                                    onClick={() => onCopy()}
                                    title="초대 링크 복사하기"
                                    desc="링크를 팀원들에게 공유하여 초대할 수 있습니다."
                                    type={InviteStatus.Link}
                                />

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

enum InviteStatus {
    Email,
    Link,
}

interface InviteButtonProps {
    onClick: () => void;
    title: string;
    desc: string;
    type: InviteStatus;
}

const InviteButton = memo((props: InviteButtonProps) => {
    const {onClick, title, desc, type} = props;

    return (
        <button
            onClick={() => onClick()}
            className="btn btn-lg shadow-sm border border-gray-200 gap-5 bg-white justify-start"
        >
            <div className="rounded-lg p-3 bg-scordi-500 text-white">
                {type === InviteStatus.Email && <HiOutlineEnvelope size={22} />}
                {type === InviteStatus.Link && <HiLink size={22} />}
            </div>

            <div className="text-start">
                <p className="text-lg font-bold">{title}</p>
                <p className="text-sm text-gray-500">{desc}</p>
            </div>
        </button>
    );
});
