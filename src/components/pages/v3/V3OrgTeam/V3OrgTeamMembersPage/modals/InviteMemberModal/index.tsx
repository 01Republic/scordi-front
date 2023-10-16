import React, {memo, useEffect, useState} from 'react';
import {useModal} from '^components/pages/v3/share/modals/useModal';
import {isOpeninviteOrgMemberModalAtom} from './atom';
import {ModalTopbar} from '^components/pages/v3/share/modals/ModalTopbar';
import {MobileSection} from '^v3/share/sections/MobileSection';
import {ModalLikeBottomBar} from '^components/pages/v3/layouts/V3ModalLikeLayout.mobile/ModalLikeBottomBar';
import {useRecoilValue} from 'recoil';
import {currentOrgAtom} from '^atoms/organizations.atom';
import {InviteEmailInput} from './InviteEmailInput';
import {FieldValues, useFieldArray, useForm} from 'react-hook-form';
import {toast} from 'react-toastify';
import {CreateMembershipInvite} from '^api/membership.api';
import {AiFillCheckCircle} from 'react-icons/ai';

export const InviteOrgMemberModal = memo(() => {
    const [isendEmail, setIsSendEmail] = useState(false);
    const {isShow, Modal, close} = useModal({isShowAtom: isOpeninviteOrgMemberModalAtom});
    const currentOrg = useRecoilValue(currentOrgAtom);
    const form = useForm<FieldValues>();
    const fieldArray = useFieldArray({control: form.control, name: 'emails'});

    useEffect(() => {
        if (!isShow) {
            setIsSendEmail(false);
            fieldArray.remove();
            form.reset();
        }
    }, [isShow]);

    const inviteMembership = () => {
        if (!currentOrg) return;

        const invitedEmail = form.getValues('email');
        const invitedEmails = fieldArray.fields.length
            ? fieldArray.fields.map((field: any) => field.email)
            : [invitedEmail];

        if (!invitedEmail && !invitedEmails[0]) {
            toast.error('이메일을 입력해주세요');
            return;
        }

        CreateMembershipInvite({organizationId: currentOrg.id, invitedEmails: invitedEmails})
            .then(() => setIsSendEmail(true))
            .catch((err) => console.log(err));
    };

    return (
        <Modal wrapperClassName="modal-right" className="p-0 max-w-none sm:max-w-[32rem] z-50">
            <ModalTopbar backBtnOnClick={close} topbarPosition="sticky" />

            <MobileSection.Padding>
                {isendEmail ? (
                    <div className="text-center py-32 flex flex-col gap-8">
                        <AiFillCheckCircle size={52} className="text-scordi mx-auto" />
                        <h3 className="font-bold text-2xl">멤버 초대가 완료되었어요! </h3>
                        <p>
                            워크스페이스에 멤버를 초대했어요.
                            <br />
                            멤버가 가입 후 워크스페이스에 들어오기 전까지 기다려주세요.
                        </p>
                        <button className="btn btn-scordi-light w-full text-lg">📩 초대 메일이 발송되었어요</button>
                    </div>
                ) : (
                    <>
                        <div className="py-32 flex flex-col gap-5">
                            <h3 className="font-bold text-2xl">
                                초대 메일 전송을 위해 <br /> 계정 정보가 필요해요
                            </h3>

                            <p>초대할 멤버의 이메일을 입력해주세요.</p>
                            <InviteEmailInput form={form} fieldArray={fieldArray} />
                        </div>
                    </>
                )}
            </MobileSection.Padding>
            {!isendEmail && (
                <ModalLikeBottomBar>
                    <button
                        className="btn btn-lg btn-block btn-scordi font-medium font-white text-xl bg-slate-50"
                        type="button"
                        onClick={inviteMembership}
                    >
                        워크스페이스 멤버 초대하기
                    </button>
                </ModalLikeBottomBar>
            )}
        </Modal>
    );
});
