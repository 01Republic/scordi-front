import React, {memo, useEffect} from 'react';
import {useRecoilValue, useResetRecoilState} from 'recoil';
import {currentOrgAtom} from '^models/Organization/atom';
import {useMemberships} from '^models/Membership/hook';
import {ModalLikeBottomBar} from '^v3/layouts/V3ModalLikeLayout.mobile/ModalLikeBottomBar';
import {useModal} from '^v3/share/modals/useModal';
import {ModalTopbar} from '^v3/share/modals/ModalTopbar';
import {MobileSection} from '^v3/share/sections/MobileSection';
import {createInviteTeamMemberAtom, emailInputValueAtom, isLoadingAtom, isOpenInviteOrgMemberModalAtom} from '../atom';
import {InputInviteEmails} from './InputInviteEmails';
import {CTAButton} from '^v3/share/modals/NewTeamMemberModal/InviteMemberModal/Modal/CTAButton';
import {RequiredFormControl} from '^components/util/form-control/RequiredFormControl';
import {LoadingModal} from '^v3/share/modals/NewTeamMemberModal/InviteMemberModal/LoadingModal';

export const InviteOrgMemberModal = memo(() => {
    const {isShow, Modal, close} = useModal({isShowAtom: isOpenInviteOrgMemberModalAtom});
    const {searchMemberships} = useMemberships();
    const currentOrg = useRecoilValue(currentOrgAtom);
    const resetFormData = useResetRecoilState(createInviteTeamMemberAtom);
    const resetInputValue = useResetRecoilState(emailInputValueAtom);
    const resetIsLoading = useResetRecoilState(isLoadingAtom);

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
                    <div className="flex flex-col gap-5">
                        <h3 className="font-bold text-2xl">
                            초대 메일 전송을 위해 <br /> 계정 정보가 필요해요
                        </h3>

                        <RequiredFormControl topLeftLabel="초대할 멤버의 이메일을 입력해주세요">
                            <InputInviteEmails />
                        </RequiredFormControl>
                    </div>
                </MobileSection.Padding>
                <ModalLikeBottomBar>
                    <CTAButton />
                </ModalLikeBottomBar>
            </Modal>
            <LoadingModal />
        </>
    );
});
