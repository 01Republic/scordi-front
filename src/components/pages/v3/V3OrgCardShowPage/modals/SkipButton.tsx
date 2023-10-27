import React, {memo} from 'react';
import {AiOutlineArrowRight} from 'react-icons/ai';
import {inputCardHoldingMemeberModal, inputCardNameModal, selectAppModal} from './atom';
import {useModal} from '../../share/modals/useModal';

interface SkipButtonProps {
    currentModal: 'cardCompany' | 'cardName' | 'cardHoldingMember' | 'selectAppModal';
}

export const SkipButton = memo((props: SkipButtonProps) => {
    const {currentModal} = props;
    const {open: openCardNameModal, close: closeCardNameModal} = useModal(inputCardNameModal);
    const {open: openCardHoldingMemberModal, close: closeCardHoldingMemberModal} =
        useModal(inputCardHoldingMemeberModal);
    const {open: openSelectAppsModal, close: closeSelectAppsModal} = useModal(selectAppModal);
    console.log(currentModal);
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
                return;
            }
        }
    };

    return (
        <div onClick={skipModal} className="btn btn-ghost absolute top-20 right-5 flex gap-2">
            <button className="">건너뛰기</button>
            <AiOutlineArrowRight className="self-center" />
        </div>
    );
});
