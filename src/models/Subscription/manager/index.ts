import {BasicManager} from '^models/BasicManager';
import {SubscriptionDto, SubscriptionStatus} from 'src/models/Subscription/types';
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
            // TODO: [fred] enum 으로 정의된 값의 비교는 string 이 아니라 enum 으로 비교해야 합니다.
            //  그리고, 전체 소스코드에서 인라인 문자열을 사용하는 것은 가급적 지양해야 합니다.
            //  인라인 문자열은 잠재적 버그요소 입니다.
            //  만약 'PAYMENT_PENDING' 을 의미하는 값이 다른 것으로 수정되는 경우,
            //  타입체크에서도 잡지 못하고, 별 수 없이 사용자 런타임 환경의 에러로 이어지게 됩니다.
            //  또, '구독 상태' 중 '결제대기' 상태를 의미하는 문자열이 'PAYMENT_PENDING' 라면
            //  이는 반드시 한 곳에서만 선언하고 필요한곳에서 참조되어야 합니다.
            //  아래 코드는 제가 수정해두었습니다. 이를 참고하여 이어지는 다른 메소드들도 수정해주세요.
            //
            // return item.status === 'PAYMENT_PENDING';
            return item.status === SubscriptionStatus.PAYMENT_PENDING;
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

    // TODO: [fred] 메소드 이름에 오타가 있습니다.
    //  IDE 를 사용함에 있어 간과할 수 없는 장점 중 하나는, 이렇게 오타가 의심되는 경우에 어떤식으로든 미리 알려준다는 겁니다.
    //  아마 cancled() 에 밑줄이 표시되고 있을겁니다.
    //  품질 높은 코드의 첫 번째 요건은 디테일입니다.
    //  이런 사소한 것들을 코드 작성간에 놓치지 않는 것이 다른 무엇보다 중요합니다.
    //  어쩌다 실수 할 수 있지만, 한 번은 언급할 필요가 있는 부분이라 말씀 드립니다!
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
