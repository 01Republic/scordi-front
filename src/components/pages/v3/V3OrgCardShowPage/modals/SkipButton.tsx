import React, {memo} from 'react';
import {AiOutlineArrowRight} from 'react-icons/ai';
import {inputCardHoldingMemeberModal, inputCardNameModal, selectAppModal} from './atom';
import {useModal} from '../../share/modals/useModal';

interface SkipButtonProps {
    currentModal: 'cardCompany' | 'cardName' | 'cardHoldingMember' | 'selectAppModal';
    isModify: boolean;
    submitCardNumber?: () => void;
}

export const SkipButton = memo((props: SkipButtonProps) => {
    const {currentModal, isModify, submitCardNumber} = props;
    const {open: openCardNameModal, close: closeCardNameModal} = useModal(inputCardNameModal);
    const {open: openCardHoldingMemberModal, close: closeCardHoldingMemberModal} =
        useModal(inputCardHoldingMemeberModal);
    const {open: openSelectAppsModal, close: closeSelectAppsModal} = useModal(selectAppModal);

    const skipModal = () => {
        switch (currentModal) {
            case 'cardCompany': {
                openCardNameModal();
                break;
            }
            case 'cardName': {
                openCardHoldingMemberModal();
                break;
            }
            case 'cardHoldingMember': {
                openSelectAppsModal();
                return;
            }
            case 'selectAppModal': {
                closeSelectAppsModal();
                closeCardHoldingMemberModal();
                closeCardNameModal();
                submitCardNumber && submitCardNumber();
                return;
            }
        }
    };

    return (
        <>
            {!isModify && (
                <button
                    onClick={skipModal}
                    className="btn btn-link btn-sm flex gap-2 !bg-transparent text-slate-400 !no-underline px-0 font-[400]"
                >
                    건너뛰기
                </button>
            )}
        </>
    );
});
