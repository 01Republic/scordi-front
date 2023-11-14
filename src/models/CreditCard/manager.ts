import {BasicManager} from '^models/BasicManager';
import {CreditCardDto} from '^models/CreditCard/credit-cards.type';

export class CreditCardManager extends BasicManager<CreditCardDto> {
    findById(id: number) {
        return this.find((creditCard) => creditCard.id === id);
    }
}
