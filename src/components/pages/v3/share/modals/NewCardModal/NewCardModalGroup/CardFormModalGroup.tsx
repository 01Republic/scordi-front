import {memo, useEffect} from 'react';
import {CardNumberModal} from '../CardNumberModal';
import {CardCompanyModal} from '../CardCompanyModal';
import {CardNameModal} from '../CardNameModal';
import {CardHoldingMember} from '../CardHoldingMemberModal';
import {SelectAppModal} from '../SelectAppModal';
import {useModal} from '^v3/share/modals/useModal';
import {selectAppModal} from '^v3/share/modals/NewCardModal/SelectAppModal/atom';
import {inputCardHoldingMemberModal} from '^v3/share/modals/NewCardModal/CardHoldingMemberModal/atom';
import {selectCardCompanyModal} from '^v3/share/modals/NewCardModal/CardCompanyModal/atom';
import {inputCardNameModal} from '^v3/share/modals/NewCardModal/CardNameModal/atom';
import {inputCardNumberModal} from '^v3/share/modals/NewCardModal/CardNumberModal/atom';

export const CardFormModalGroup = memo(function CardFormModalGroup() {
    const cardNumberModal = useModal(inputCardNumberModal);
    const cardCompanyModal = useModal(selectCardCompanyModal);
    const cardNameModal = useModal(inputCardNameModal);
    const holderModal = useModal(inputCardHoldingMemberModal);
    const appsModal = useModal(selectAppModal);

    useEffect(() => {
        if (cardNumberModal.isShow) cardNumberModal.setIsShow(false);
        if (cardCompanyModal.isShow) cardCompanyModal.setIsShow(false);
        if (cardNameModal.isShow) cardNameModal.setIsShow(false);
        if (holderModal.isShow) holderModal.setIsShow(false);
        if (appsModal.isShow) appsModal.setIsShow(false);
    }, []);

    return (
        <>
            <CardNumberModal />
            <CardCompanyModal />
            <CardNameModal />
            <CardHoldingMember />
            <SelectAppModal />
        </>
    );
});
