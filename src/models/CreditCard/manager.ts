import {CreditCardDto} from '^types/credit-cards.type';
import {BasicModel} from '^models/BasicModel';

export class CreditCardManager extends BasicModel<CreditCardDto> {
    findById(id: number) {
        return this.find((creditCard) => creditCard.id === id);
    }
}
