import React, {memo, useEffect} from 'react';
import {useRecoilValue, useResetRecoilState} from 'recoil';
import {currentOrgAtom} from '^models/Organization/atom';
import {useMembershipInInviteModal, useMemberships} from '^models/Membership/hook';
import {ModalLikeBottomBar} from '^v3/layouts/V3ModalLikeLayout.mobile/ModalLikeBottomBar';
import {useModal} from '^v3/share/modals/useModal';
import {ModalTopbar} from '^v3/share/modals/ModalTopbar';
import {MobileSection} from '^v3/share/sections/MobileSection';
import {createInviteTeamMemberAtom, emailInputValueAtom, isLoadingAtom, isOpenInviteOrgMemberModalAtom} from '../atom';
import {InputInviteEmails} from './InputInviteEmails';
import {CTAButton} from '^v3/share/modals/NewTeamMemberModal/InviteMemberModal/Modal/CTAButton';
import {RequiredFormControl} from '^components/util/form-control/RequiredFormControl';
import {LoadingModal} from '^v3/share/modals/NewTeamMemberModal/InviteMemberModal/LoadingModal';
import {ModalTitle} from '^v3/share/modals/ModalTitle';

interface InviteOrgMemberModalProps {
    onClose?: () => void;
}
export const InviteOrgMemberModal = memo((props: InviteOrgMemberModalProps) => {
    const {isShow, Modal, close} = useModal({isShowAtom: isOpenInviteOrgMemberModalAtom});
    const {search: searchMemberships} = useMembershipInInviteModal();
    const currentOrg = useRecoilValue(currentOrgAtom);
    const resetFormData = useResetRecoilState(createInviteTeamMemberAtom);
    const resetInputValue = useResetRecoilState(emailInputValueAtom);
    const resetIsLoading = useResetRecoilState(isLoadingAtom);

    const {onClose} = props;

    useEffect(() => {
        resetFormData();
        resetInputValue();
        resetIsLoading();
    }, [isShow]);

    useEffect(() => {
        if (!currentOrg) return;
        searchMemberships({where: {organizationId: currentOrg.id}});
    }, [currentOrg]);

    return (
        <>
            <Modal wrapperClassName="modal-right" className="p-0 max-w-none sm:max-w-[32rem] z-50">
                <ModalTopbar backBtnOnClick={close} topbarPosition="sticky" />

                <MobileSection.Padding>
                    <ModalTitle title={'초대 메일 전송을 위해 \n 계정 정보가 필요해요'} />
                </MobileSection.Padding>

                <MobileSection.Padding>
                    <RequiredFormControl topLeftLabel="초대할 멤버의 이메일을 입력해주세요">
                        <InputInviteEmails />
                    </RequiredFormControl>
                </MobileSection.Padding>

                <ModalLikeBottomBar>
                    <CTAButton onClose={onClose} />
                </ModalLikeBottomBar>
            </Modal>
            <LoadingModal />
        </>
    );
});
