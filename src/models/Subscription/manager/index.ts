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

    // 유료 구독 (billing histories 여부로 구분)
    paid() {
        return this.filter((item) => {
            if (!item.billingHistories?.length) return;

            return item.billingHistories?.length > 0;
        });
    }

    // 무료 구독
    free() {
        return this.filter((item) => {
            return !item.billingHistories?.length;
        });
    }

    // 결제 예정
    pending() {
        return this.filter((item) => {
            return item.status === 'PAYMENT_PENDING';
        });
    }

    // 결제 실패
    failed() {
        return this.filter((item) => {
            return item.status === 'PAYMENT_FAILURE';
        });
    }

    // 활성화된 구독
    success() {
        return this.filter((item) => {
            return item.status === 'PAYMENT_SUCCESS';
        });
    }

    // 일시정지된 구독
    paused() {
        return this.filter((item) => {
            return item.status === 'PAUSED';
        });
    }

    // 취소된 구독
    cancled() {
        return this.filter((item) => {
            return item.status === 'CANCELED';
        });
    }

    // 만료된 구독
    expired() {
        return this.filter((item) => {
            return item.status === 'FREE_TRIAL_EXPIRED';
        });
    }
}
