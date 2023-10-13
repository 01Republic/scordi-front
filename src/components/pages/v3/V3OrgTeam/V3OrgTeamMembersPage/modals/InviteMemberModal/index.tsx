import React, {memo, useState} from 'react';
import {useModal} from '^components/pages/v3/share/modals/useModal';
import {isOpeninviteOrgMemberModalAtom} from './atom';
import {ModalTopbar} from '^components/pages/v3/share/modals/ModalTopbar';
import {MobileSection} from '^v3/share/sections/MobileSection';
import {ModalLikeBottomBar} from '^components/pages/v3/layouts/V3ModalLikeLayout.mobile/ModalLikeBottomBar';
import {useRecoilValue} from 'recoil';
import {currentOrgAtom} from '^atoms/organizations.atom';
import {InviteEmailInput} from '../../InviteEmailInput';
import {useFieldArray, useForm} from 'react-hook-form';
import {toast} from 'react-toastify';
import {CreateMembershipInvite} from '^api/membership.api';
import {MembershipDto} from '^types/membership.type';

export const InviteOrgMemberModal = memo(() => {
    const [registeredAccount, setRegisteredAccount] = useState<MembershipDto>();
    const {Modal, close} = useModal({isShowAtom: isOpeninviteOrgMemberModalAtom});
    const currentOrg = useRecoilValue(currentOrgAtom);
    const form = useForm();
    const control = form.control;
    const fieldArray = useFieldArray({control, name: 'emails'});

    const checkRegisteredAccount = () => {
        if (registeredAccount?.approvalStatus === 'PENDING') {
            toast.error('이미 초대된 계정입니다.');
            return;
        }
    };

    const inviteMembership = () => {
        if (!currentOrg) return;

        const invitedEmail = form.getValues('email');
        const invitedEmails = fieldArray.fields.length ? fieldArray.fields.map((field) => field.email) : [invitedEmail];

        if (invitedEmails.length === 0) {
            toast.error('이메일을 입력해주세요');
            return;
        }

        if (!invitedEmail) {
            toast.error('이메일을 입력해주세요');
            return;
        }

        CreateMembershipInvite({organizationId: currentOrg.id, invitedEmails: invitedEmails})
            .then((datas) => {
                setRegisteredAccount(datas.data);
                registeredAccount?.approvalStatus === 'PENDING' && toast.error('이미 등록된 계정입니다.');
                return;
            })
            .catch((err) => console.log(err));

        close();
        fieldArray.remove();
        form.reset();
    };

    return (
        <Modal wrapperClassName="modal-right" className="p-0 max-w-none sm:max-w-[32rem] z-50">
            <ModalTopbar backBtnOnClick={close} topbarPosition="sticky" />

            <MobileSection.Padding>
                <div className="h-full py-32">
                    <h3 className="font-bold text-2xl py-5">
                        초대 메일 전송을 위해 <br /> 계정 정보가 필요해요
                    </h3>

                    <p>초대할 멤버의 이메일을 입력해주세요.</p>
                    <InviteEmailInput form={form} fieldArray={fieldArray} />
                </div>
            </MobileSection.Padding>

            <ModalLikeBottomBar>
                <button
                    className="btn btn-lg btn-block btn-scordi font-medium font-white text-xl bg-slate-50"
                    type="button"
                    onClick={inviteMembership}
                >
                    워크스페이스 멤버 초대하기
                </button>
            </ModalLikeBottomBar>
        </Modal>
    );
});
