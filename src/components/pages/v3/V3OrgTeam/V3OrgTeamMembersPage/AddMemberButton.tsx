import React, {memo} from 'react';
import {useModal} from '^v3/share/modals/useModal';
import {isOpenNewTeamMemberModalAtom} from '^v3/share/modals/NewTeamMemberModal/CreateTeamMemberModal/atom';
import {isOpenInviteOrgMemberModalAtom} from '^v3/share/modals/NewTeamMemberModal/InviteMemberModal/atom';
import {useToast} from '^hooks/useToast';
import {useRecoilValue} from 'recoil';
import {orgIdParamState} from '^atoms/common';
import {serviceHost} from '^config/environments';
import {Link, Mail, Plus, User} from 'lucide-react';

export enum ButtonTypes {
    TextBtn = 'textBtn',
    ScordiBtn = 'scordiBtn',
    PlusBtn = 'plusBtn',
}

interface AddMemberButtonProps {
    text?: string;
    direction?: string;
    className?: string;
    type: ButtonTypes;
}

export const AddMemberButton = memo((props: AddMemberButtonProps) => {
    const {isShow: isNewTeamMemberModalShow, setIsShow: setNewTeamMemberModalShow} = useModal({
        isShowAtom: isOpenNewTeamMemberModalAtom,
    });
    const {isShow: isInviteMemberModalShow, setIsShow: setInviteOrgMemberModalShow} = useModal({
        isShowAtom: isOpenInviteOrgMemberModalAtom,
    });
    const {toast} = useToast();
    const orgId = useRecoilValue(orgIdParamState);
    const {text, direction, className, type} = props;
    const link = `${serviceHost}/v3/orgs/${orgId}/join?isCopied=true`;

    const newTeamMemberModalShow = () => setNewTeamMemberModalShow(true);
    const inviteOrgMemberModalShow = () => setInviteOrgMemberModalShow(true);
    const onCopy = () => {
        if (!link) return;
        navigator.clipboard.writeText(link);
        toast.success('클립보드에 복사했습니다.');
    };

    return (
        <>
            {/* 모든 모달이 꺼진 상태일 때에만 생성모달 플로팅 버튼이 활성화됩니다. */}
            {[!isNewTeamMemberModalShow, !isInviteMemberModalShow].every((e) => e) && (
                <div
                    className={`dropdown dropdown-${direction ? direction : 'bottom'} dropdown-end ${
                        type === ButtonTypes.PlusBtn && 'rounded-full btn-floating'
                    }`}
                >
                    {/*Plus Button*/}
                    {type === ButtonTypes.PlusBtn && (
                        <button tabIndex={0} className={`btn btn-lg btn-scordi btn-circle z-10 ${className}`}>
                            <Plus size={48} />
                        </button>
                    )}

                    {/*Text Button*/}
                    {type === ButtonTypes.TextBtn && (
                        <button tabIndex={0} className={`cursor-pointer text-sm text-gray-500 ${className}`}>
                            {text}
                        </button>
                    )}

                    {/*Scordi Button*/}
                    {type === ButtonTypes.ScordiBtn && (
                        <button
                            tabIndex={0}
                            className="btn btn-scordi m-1 gap-2 whitespace-nowrap flex-nowrap mt-8 md:mt-0 btn-lg md:btn-md w-full md:w-auto"
                        >
                            {text} <Plus />
                        </button>
                    )}

                    <ul
                        tabIndex={0}
                        className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52 my-2 text-sm"
                    >
                        <li onClick={inviteOrgMemberModalShow}>
                            <span>
                                <Mail /> 이메일로 초대하기
                            </span>
                        </li>
                        <li onClick={onCopy}>
                            <span>
                                <Link />
                                초대링크 복사하기
                            </span>
                        </li>
                        <li onClick={newTeamMemberModalShow}>
                            <span>
                                <User />
                                직접 등록하기
                            </span>
                        </li>
                    </ul>
                </div>
            )}
        </>
    );
});
