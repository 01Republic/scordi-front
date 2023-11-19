import {BasicManager} from '^models/BasicManager';
import {SubscriptionDto} from 'src/models/Subscription/types';
import {ProductManager} from '^models/Product/manager';

export class SubscriptionManager extends BasicManager<SubscriptionDto> {
    products() {
        const products = this.attrMap('product');
        return ProductManager.init(products).unique('id');
    }

    uniqueByProduct() {
        return this.sortBy<SubscriptionManager>({id: 'ASC'}).unique((s) => s.productId || s.product.id);
    }
}
