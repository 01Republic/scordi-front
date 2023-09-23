import {BasicModel} from '^models/BasicModel';
import {SubscriptionDto} from '^types/subscription.type';
import {ProductManager} from '^models/Product/manager';

export class SubscriptionManager extends BasicModel<SubscriptionDto> {
    products() {
        const products = this.attrMap('product');
        return ProductManager.init(products).unique('id');
    }

    uniqueByProduct() {
        return this.sortBy<SubscriptionManager>({id: 'ASC'}).unique('productId');
    }
}
