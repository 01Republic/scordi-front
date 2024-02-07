import React, {memo, RefObject} from 'react';
import {NextButtonUI} from '^v3/share/NextButtonUI';
import {debounce} from 'lodash';
import {plainToast} from '^hooks/useToast';
import {emailValid} from '^utils/input-helper';
import {teamMemberApi, TeamMemberDto} from '^models/TeamMember';
import {useRecoilValue, useSetRecoilState} from 'recoil';
import {orgIdParamState} from '^atoms/common';
import {useModal} from '^v3/share/modals';
import {
    createNewTeamMemberAtom,
    isOpenNewTeamMemberModalAtom,
    lastTeamMemberInfo,
} from '^v3/share/modals/NewTeamMemberModal/CreateTeamMemberModal/atom';

interface CTAButtonProps {
    nameInputRef: RefObject<HTMLInputElement>;
    emailInputRef: RefObject<HTMLInputElement>;
    onCreate?: () => any;
}

export const CTAButton = memo((props: CTAButtonProps) => {
    const orgId = useRecoilValue(orgIdParamState);
    const {close} = useModal({isShowAtom: isOpenNewTeamMemberModalAtom});
    const formData = useRecoilValue(createNewTeamMemberAtom);
    const setResponse = useSetRecoilState(lastTeamMemberInfo);
    const {nameInputRef, emailInputRef, onCreate} = props;

    const confirmData = () => {
        const duration = 4000;

        if (!formData.name) {
            nameInputRef.current?.focus();
            plainToast.error('이름을 입력해주세요', {duration});
            return;
        }

        if (!formData.email) {
            emailInputRef.current?.focus();
            plainToast.error('이메일을 입력해주세요', {duration});
            return;
        }

        if (!emailValid(formData.email)) {
            emailInputRef.current?.focus();
            plainToast.error('이메일 형식에 맞게 입력해주세요', {duration});
            return;
        }
    };

    const onSubmit = debounce(() => {
        const duration = 4000;

        if (!formData) return;

        teamMemberApi.create(orgId, formData).then((res) => {
            plainToast.success('추가되었습니다', {duration});
            setResponse(res.data);
            onCreate && onCreate();
            close();
        });
    }, 500);

    const isActive = !!formData.name && !!formData.email && emailValid(formData.email);

    return (
        <span className="w-full" onClick={() => !isActive && confirmData()}>
            <NextButtonUI isActive={isActive} onClick={() => onSubmit()}>
                완료
            </NextButtonUI>
        </span>
    );
});
