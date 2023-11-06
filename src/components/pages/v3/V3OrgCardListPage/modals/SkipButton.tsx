import React, {memo} from 'react';
import {inputCardHoldingMemberModal, inputCardNameModal, selectAppModal} from './atom';
import {useModal} from '../../share/modals/useModal';

interface SkipButtonProps {
    currentModal: 'cardCompany' | 'cardName' | 'cardHoldingMember' | 'selectAppModal';
    isModify: boolean;
    submitCardNumber?: (() => Promise<void>) | (() => void);
}

export const SkipButton = memo((props: SkipButtonProps) => {
    const {currentModal, isModify, submitCardNumber} = props;
    const {open: openCardNameModal} = useModal(inputCardNameModal);
    const {open: openCardHoldingMemberModal} = useModal(inputCardHoldingMemberModal);
    const {open: openSelectAppsModal} = useModal(selectAppModal);

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
