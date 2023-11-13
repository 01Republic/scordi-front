import {atom, selector, useRecoilValue} from 'recoil';
import {ProductDto} from '^types/product.type';
import {SubscriptionDto} from '^types/subscription.type';
import {productApi} from '^api/product.api';

export const selectAppModal = {
    isShowAtom: atom({
        key: 'v3/selectAppModal',
        default: false,
    }),
    popStateSyncKey: 'selectAppModal',
};

// 선택된 앱 정보
export const selectedAppsAtom = atom({
    key: 'selectedAppsAtom',
    default: <ProductDto[]>[],
});

// 카드에 연동된 앱 id
export const productIdsAtom = atom({
    key: 'productIdsAtom',
    default: <number[]>[],
});

// 구독중인 앱 정보
export const subscriptionsAtom = atom({
    key: 'subscriptionsAtom',
    default: <SubscriptionDto[]>[],
});

// 카드 연동 앱 셀렉트 리스트
export const allProductsSelector = selector({
    key: 'allProductsSelector',
    get: async () => {
        // 구독한 Saas 리스트
        const subscriptions = useRecoilValue(subscriptionsAtom);
        const subscriptionProducts = subscriptions.map((subscription) => {
            return subscription.product;
        });

        // SaaS 전체 리스트 받아오기
        const res = await productApi.index();
        const allProducts = res.data.items;

        // 구독하지 않은 Saas 리스트
        const unsubscribedProducts = allProducts.filter((list) => {
            return !subscriptionProducts.some((product) => product.id === list.id);
        });
        return subscriptionProducts.concat(unsubscribedProducts);
    },
});
