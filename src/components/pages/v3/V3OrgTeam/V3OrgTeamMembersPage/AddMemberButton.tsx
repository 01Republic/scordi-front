import React, {memo} from 'react';
import {useModal} from '../../share/modals/useModal';
import {isOpenNewTeamMemberModalAtom} from './modals/NewTeamMemberModal/atom';
import {isOpeninviteOrgMemberModalAtom} from './modals/InviteMemberModal/atom';
import {BsPlus} from 'react-icons/bs';
import {FaPlus} from 'react-icons/fa6';

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
    const {text, direction, className, type} = props;

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
                        type === ButtonTypes.PlusBtn && 'rounded-full btn-floating'
                    }`}
                >
                    {/*Plus Button*/}
                    {type === ButtonTypes.PlusBtn && (
                        <button tabIndex={0} className={`btn btn-lg btn-scordi btn-circle z-10 ${className}`}>
                            <BsPlus size={48} />
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
                            {text} <FaPlus />
                        </button>
                    )}

                    <ul
                        tabIndex={0}
                        className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52 my-2"
                    >
                        <li onClick={inviteOrgMemberModalShow}>
                            <span>이메일로 초대하기</span>
                        </li>
                        <li onClick={newTeamMemberModalShow}>
                            <span>직접 등록하기</span>
                        </li>
                    </ul>
                </div>
            )}
        </>
    );
});
