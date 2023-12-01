import React, {memo, useEffect, useState} from 'react';
import {useModal} from '^components/pages/v3/share/modals/useModal';
import {isOpeninviteOrgMemberModalAtom} from './atom/atom';
import {ModalTopbar} from '^components/pages/v3/share/modals/ModalTopbar';
import {MobileSection} from '^v3/share/sections/MobileSection';
import {ModalLikeBottomBar} from '^components/pages/v3/layouts/V3ModalLikeLayout.mobile/ModalLikeBottomBar';
import {useRecoilState, useRecoilValue} from 'recoil';
import {currentOrgAtom} from '^models/Organization/atom';
import {invitedEmailsAtom, teamMembersSearchResultAtom} from '^models/TeamMember/atom';
import {InviteEmailInput} from './InviteEmailInput';
import {FieldValues, useForm} from 'react-hook-form';
import {useMemberships} from '^models/Membership/hook';
import {debounce} from 'lodash';
import {useAlert} from '^hooks/useAlert';
import {inviteMembershipApi} from '^models/Membership/api';
import {useInviteMember} from '^v3/V3OrgTeam/V3OrgTeamMembersPage/modals/InviteMemberModal/hook';

export const InviteOrgMemberModal = memo(() => {
    const {isShow, Modal, close} = useModal({isShowAtom: isOpeninviteOrgMemberModalAtom});
    const [isLoading, setIsLoading] = useState(false);
    const [invitedEmails, setInvitedEmails] = useRecoilState(invitedEmailsAtom);
    const {searchMemberships} = useMemberships();
    const currentOrg = useRecoilValue(currentOrgAtom);
    const form = useForm<FieldValues>();
    const {alert} = useAlert();
    const {confirmOrgMember} = useInviteMember();

    useEffect(() => {
        if (!isShow) {
            setInvitedEmails([]);
            form.reset();
        }
    }, [isShow]);

    useEffect(() => {
        if (!currentOrg) return;
        searchMemberships({where: {organizationId: currentOrg.id}});
    }, [currentOrg]);

    // 초대 이메일 보내는 함수
    const inviteMembership = debounce(async () => {
        if (!currentOrg) return;
        const invitedEmail = form.getValues('email');

        // 이미 조직에 가입된 멤버라면 return
        const isOrgMember = confirmOrgMember(invitedEmail);
        if (!isOrgMember) return;

        const createInvitedEmails = invitedEmail ? [...invitedEmails, invitedEmail] : invitedEmails;

        // 로딩중이 아닐때만 실행
        if (!isLoading) {
            setIsLoading(true);
            const res = await inviteMembershipApi.create({
                organizationId: currentOrg.id,
                invitedEmails: createInvitedEmails,
            });
            if (res) {
                close();
                setIsLoading(false);
                alert.success({title: '초대가 완료되었습니다.'});
            }
        }
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
                    <InviteEmailInput form={form} />
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
