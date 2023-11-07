import {atom, selector, useRecoilValue} from 'recoil';
import {getProducts} from '^api/product.api';
import {subscriptionsAtom} from '../../atom';

export const selectAppModal = {
    isShowAtom: atom({
        key: 'v3/selectAppModal',
        default: false,
    }),
    popStateSyncKey: 'selectAppModal',
};

export const allProductsSelector = selector({
    key: 'allProductsSelector',
    get: async () => {
        // 구독한 Saas 리스트
        const subscriptions = useRecoilValue(subscriptionsAtom);
        const subscriptionProducts = subscriptions.map((subscription) => {
            return subscription.product;
        });

        // SaaS 전체 리스트 받아오기
        const res = await getProducts();
        const allProducts = res.data.items;

        // 구독하지 않은 Saas 리스트
        const unsubscribedProducts = allProducts.filter((list) => {
            return !subscriptionProducts.some((product) => product.id === list.id);
        });
        return subscriptionProducts.concat(unsubscribedProducts);
    },
});
