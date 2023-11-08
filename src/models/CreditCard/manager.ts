import {BasicModel} from '^models/BasicModel';
import {CreditCardDto} from '^models/CreditCard/credit-cards.type';

export class CreditCardManager extends BasicModel<CreditCardDto> {
    findById(id: number) {
        return this.find((creditCard) => creditCard.id === id);
    }
}
