import {CreditCardDto} from '^models/CreditCard/type';
import {creditCardApi} from '^models/CreditCard/api';
import {toast} from 'react-hot-toast';

export function destroyCreditCardHandler(creditCard: CreditCardDto, onSaved: () => any) {
    const {id, organizationId: orgId} = creditCard;

    const request = () => {
        creditCardApi.destroy(orgId, id).then(() => {
            toast.success('삭제했습니다.');
            onSaved();
        });
    };
}
