import {BasicManager} from '^models/BasicManager';
import {CreditCardDto} from '^models/CreditCard/type';

export class CreditCardManager extends BasicManager<CreditCardDto> {
    findById(id: number) {
        return this.find((creditCard) => creditCard.id === id);
    }
}
