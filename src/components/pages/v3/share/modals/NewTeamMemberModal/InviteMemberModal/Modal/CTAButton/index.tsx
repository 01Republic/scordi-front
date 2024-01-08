import React, {memo, useState} from 'react';
import {NextButtonUI} from '^v3/share/NextButtonUI';
import {useRecoilState, useRecoilValue} from 'recoil';
import {
    createInviteTeamMemberAtom,
    emailInputValueAtom,
    isLoadingAtom,
    isOpenInviteOrgMemberModalAtom,
    isOpenLoadingModalAtom,
} from '^v3/share/modals/NewTeamMemberModal/InviteMemberModal/atom';
import {useToast} from '^hooks/useToast';
import {debounce} from 'lodash';
import {currentOrgAtom} from '^models/Organization/atom';
import {useInviteMember} from '^v3/share/modals/NewTeamMemberModal/InviteMemberModal/Modal/InputInviteEmails/useInviteMember';
import {inviteMembershipApi} from '^models/Membership/api';
import {useTeamMembers} from '^models/TeamMember';
import {useAlert} from '^hooks/useAlert';
import {useModal} from '^v3/share/modals';

export const CTAButton = memo(() => {
    const formData = useRecoilValue(createInviteTeamMemberAtom);
    const currentOrg = useRecoilValue(currentOrgAtom);
    const inputValue = useRecoilValue(emailInputValueAtom);
    const {close} = useModal({isShowAtom: isOpenInviteOrgMemberModalAtom});
    const [isLoading, setIsLoading] = useRecoilState(isLoadingAtom);
    const {confirmOrgMember} = useInviteMember();
    const {isExist, reload, search: getTeamMembers} = useTeamMembers();
    const {open, close: closeLoadingModal} = useModal({isShowAtom: isOpenLoadingModalAtom});
    const {alert} = useAlert();
    const {toast} = useToast();
    const invitedEmails = formData?.invitedEmails;
    const isActive = !!invitedEmails?.length || (inputValue.includes('.') && inputValue.includes('@'));

    const confirmData = () => {
        if (isActive) return;

        if (isLoading) return toast.error('초대중입니다. 잠시만 기다려주세요');
        if (!isLoading) return toast.error('이메일을 입력해주세요');
    };

    const onSubmit = debounce(() => {
        if (!currentOrg) return;

        // 이미 조직에 가입된 멤버라면 return
        const isOrgMember = confirmOrgMember(inputValue);
        if (isOrgMember) return;

        const createInvitedEmails = inputValue
            ? invitedEmails
                ? [...invitedEmails, inputValue]
                : [inputValue]
            : invitedEmails;

        if (isLoading) return;

        setIsLoading(true);
        open();
        const req = inviteMembershipApi.create({
            organizationId: currentOrg.id,
            invitedEmails: createInvitedEmails,
        });

        req.then(() => {
            getTeamMembers({
                order: {id: 'DESC'},
                itemsPerPage: 10,
            });

            isExist && reload();

            alert.success({title: '초대가 완료되었습니다.'}).then(() => {
                setIsLoading(false);
                close();
                closeLoadingModal();
            });
        });
    }, 500);

    return (
        <span className="w-full" onClick={() => !isActive && confirmData()}>
            <NextButtonUI isActive={isActive} onClick={() => onSubmit()}>
                워크스페이스 멤버 초대하기
            </NextButtonUI>
        </span>
    );
});
