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

    paid() {
        return this.filter((item) => {
            if (!item.billingHistories?.length) return;

            return item.billingHistories?.length > 0;
        });
    }

    free() {
        return this.filter((item) => {
            return !item.billingHistories?.length;
        });
    }

    pending() {
        return this.filter((item) => {
            return item.status === 'PAYMENT_SUCCESS';
        });
    }

    failed() {
        return this.filter((item) => {
            return item.status !== 'PAYMENT_SUCCESS';
        });
    }
}
