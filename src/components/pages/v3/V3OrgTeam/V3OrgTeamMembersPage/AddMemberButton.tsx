import React, {memo} from 'react';
import {useModal} from '../../share/modals/useModal';
import {isOpenNewTeamMemberModalAtom} from './modals/NewTeamMemberModal/atom';
import {isOpeninviteOrgMemberModalAtom} from './modals/InviteMemberModal/atom';

import {BsPlus} from 'react-icons/bs';

interface AddMemberButtonProps {
    textButton?: string;
    direction?: string;
    className?: string;
}

export const AddMemberButton = memo((props: AddMemberButtonProps) => {
    const {textButton, direction, className} = props;

    const {isShow: isNewTeamMemberModalShow, setIsShow: setNewTeamMemberModalShow} = useModal({
        isShowAtom: isOpenNewTeamMemberModalAtom,
    });
    const {isShow: isInviteMemberModalShow, setIsShow: setInviteOrgMemberModalShow} = useModal({
        isShowAtom: isOpeninviteOrgMemberModalAtom,
    });

    const newTeamMemberModalShow = () => setNewTeamMemberModalShow(true);
    const inviteOrgMemberModalShow = () => setInviteOrgMemberModalShow(true);

    return (
        <>
            {/* 모든 모달이 꺼진 상태일 때에만 생성모달 플로팅 버튼이 활성화됩니다. */}
            {[!isNewTeamMemberModalShow, !isInviteMemberModalShow].every((e) => e) && (
                <div
                    className={`dropdown dropdown-${direction ? direction : 'bottom'} dropdown-end ${
                        !textButton && ' rounded-full btn-floating'
                    }`}
                >
                    {textButton ? (
                        <button tabIndex={0} className={`cursor-pointer text-sm text-gray-500 ${className}`}>
                            {textButton}
                        </button>
                    ) : (
                        <button tabIndex={0} className="btn btn-lg btn-scordi btn-circle z-10">
                            <BsPlus size={48} />
                        </button>
                    )}

                    <ul
                        tabIndex={0}
                        className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52 my-2"
                    >
                        <li onClick={inviteOrgMemberModalShow}>
                            <span>초대하기</span>
                        </li>
                        <li onClick={newTeamMemberModalShow}>
                            <span>초대하기 (가입없음)</span>
                        </li>
                    </ul>
                </div>
            )}
        </>
    );
});
