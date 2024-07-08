import {atom, useRecoilState} from 'recoil';
import {CreditCardDto} from '^models/CreditCard/type';
import {creditCardApi} from '^models/CreditCard/api';

export const creditCardSubjectAtom = atom<CreditCardDto | null>({
    key: 'OrgCreditCardShowPage/creditCardSubjectAtom',
    default: null,
});

export const useCurrentCreditCard = () => {
    const [currentCreditCard, setCurrentCreditCard] = useRecoilState(creditCardSubjectAtom);

    const findOne = async (orgId: number, id: number) => {
        return creditCardApi.show(orgId, id).then((res) => {
            setCurrentCreditCard(res.data);
            return res.data;
        });
    };

    const reload = async () => {
        if (!currentCreditCard) return;
        return findOne(currentCreditCard.organizationId, currentCreditCard.id);
    };

    return {currentCreditCard, setCurrentCreditCard, findOne, reload};
};
