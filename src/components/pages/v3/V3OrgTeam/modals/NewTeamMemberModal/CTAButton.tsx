import React, {memo, RefObject} from 'react';
import {NextButtonUI} from '^v3/share/NextButtonUI';
import {debounce} from 'lodash';
import {plainToast} from '^hooks/useToast';
import {emailValid} from '^utils/input-helper';
import {teamMemberApi, TeamMemberDto} from '^models/TeamMember';
import {useRecoilValue} from 'recoil';
import {orgIdParamState} from '^atoms/common';
import {useModal} from '^v3/share/modals';
import {createNewTeamMemberAtom, isOpenNewTeamMemberModalAtom} from '^v3/V3OrgTeam/modals/NewTeamMemberModal/atom';

interface CTAButtonProps {
    nameInputRef: RefObject<HTMLInputElement>;
    emailInputRef: RefObject<HTMLInputElement>;
    onSubmit: (savedTeamMember: TeamMemberDto) => any;
}

export const CTAButton = memo((props: CTAButtonProps) => {
    const orgId = useRecoilValue(orgIdParamState);
    const {close} = useModal({isShowAtom: isOpenNewTeamMemberModalAtom});
    const formData = useRecoilValue(createNewTeamMemberAtom);

    const {nameInputRef, emailInputRef, onSubmit: _onSubmit} = props;

    const onSubmit = debounce(() => {
        const data = formData;
        const duration = 4000;

        if (!data) return;

        if (!data.name) {
            nameInputRef.current?.focus();
            plainToast.error('이름을 입력해주세요', {duration});
            return;
        }

        if (!data.email) {
            emailInputRef.current?.focus();
            plainToast.error('이메일을 입력해주세요', {duration});
            return;
        }

        if (!emailValid(data.email)) {
            emailInputRef.current?.focus();
            plainToast.error('이메일 형식에 맞게 입력해주세요', {duration});
            return;
        }

        teamMemberApi.create(orgId, data).then((res) => {
            plainToast.success('추가되었습니다', {duration});
            close();
            _onSubmit(res.data);
        });
    }, 500);

    const isActive = !!formData.name && !!formData.email && emailValid(formData.email);

    return (
        <NextButtonUI isActive={isActive} onClick={() => onSubmit()}>
            완료
        </NextButtonUI>
    );
});
