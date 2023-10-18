import React, {memo, useEffect} from 'react';
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
import {useMemberships} from '^hooks/useMemberships';
import {debounce} from 'lodash';

export const InviteOrgMemberModal = memo(() => {
    const {isShow, Modal, close} = useModal({isShowAtom: isOpeninviteOrgMemberModalAtom});
    const {membershipSearchResult, searchMemberships} = useMemberships();
    const currentOrg = useRecoilValue(currentOrgAtom);
    const form = useForm<FieldValues>();
    const fieldArray = useFieldArray({control: form.control, name: 'emails'});

    useEffect(() => {
        if (!isShow) {
            fieldArray.remove();
            form.reset();
        }
    }, [isShow]);

    useEffect(() => {
        if (!currentOrg) return;
        searchMemberships({where: {organizationId: currentOrg.id}});
    }, [currentOrg]);

    // 이미 조직에 등록된 멤버인지 확인하는 함수
    const confirmOrgMember = () => {
        const invitedEmail = form.getValues('email');

        const orgMemberEmails = membershipSearchResult.items.filter((item) => {
            return item.invitedEmail === invitedEmail;
        });
        if (orgMemberEmails.length === 0) return;

        const orgMemberEmail = orgMemberEmails[0].approvalStatus;

        if (orgMemberEmail === 'PENDING') {
            toast.error('승인 대기 중인 멤버입니다.');
            return true;
        }

        if (orgMemberEmail === 'APPROVED') {
            toast.error('이미 등록된 멤버입니다.');
            return true;
        }
    };

    // 초대 이메일 보내는 함수
    const inviteMembership = debounce(() => {
        if (!currentOrg) return;

        const isOrgMember = confirmOrgMember();
        // 이미 조직에 가입된 멤버라면 return
        if (isOrgMember) {
            return;
        }

        const invitedEmail = form.getValues('email');
        const invitedEmails = fieldArray.fields.length
            ? fieldArray.fields.map((field: any) => field.email)
            : [invitedEmail];
        if (!invitedEmail && !invitedEmails[0]) {
            toast.error('이메일을 입력해주세요');
            return;
        }
        CreateMembershipInvite({organizationId: currentOrg.id, invitedEmails: invitedEmails})
            .then(() => {
                toast.info('초대가 완료되었습니다!');
                setTimeout(() => {
                    close();
                }, 3000);
            })
            .catch((err) => console.log(err));
    }, 500);

    return (
        <Modal wrapperClassName="modal-right" className="p-0 max-w-none sm:max-w-[32rem] z-50">
            <ModalTopbar backBtnOnClick={close} topbarPosition="sticky" />
            <MobileSection.Padding>
                <div className="py-32 flex flex-col gap-5">
                    <h3 className="font-bold text-2xl">
                        초대 메일 전송을 위해 <br /> 계정 정보가 필요해요
                    </h3>

                    <p>초대할 멤버의 이메일을 입력해주세요.</p>
                    <InviteEmailInput form={form} fieldArray={fieldArray} confirmOrgMember={confirmOrgMember} />
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
