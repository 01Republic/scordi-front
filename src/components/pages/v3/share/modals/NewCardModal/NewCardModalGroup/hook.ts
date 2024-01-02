import {useModal} from '^v3/share/modals';
import {inputCardNumberModal} from '^v3/share/modals/NewCardModal/CardNumberModal/atom';
import {selectCardCompanyModal} from '^v3/share/modals/NewCardModal/CardCompanyModal/atom';
import {inputCardNameModal} from '^v3/share/modals/NewCardModal/CardNameModal/atom';
import {inputCardHoldingMemberModal} from '^v3/share/modals/NewCardModal/CardHoldingMemberModal/atom';
import {selectAppModal} from '^v3/share/modals/NewCardModal/SelectAppModal/atom';

export const useNewCardModal = () => {
    const cardNumberModal = useModal(inputCardNumberModal);
    const cardCompanyModal = useModal(selectCardCompanyModal);
    const cardNameModal = useModal(inputCardNameModal);
    const holderModal = useModal(inputCardHoldingMemberModal);
    const appsModal = useModal(selectAppModal);

    const closeCardModalGroup = () => {
        cardNumberModal.close();
        cardCompanyModal.close();
        cardNameModal.close();
        holderModal.close();
        appsModal.close();
    };

    return {closeCardModalGroup};
};
