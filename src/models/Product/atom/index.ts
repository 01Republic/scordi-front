import {atom, selector} from 'recoil';
import {ProductDto, FindAllProductQuery} from '^models/Product/type';
import {SubscriptionPaymentPlanDto} from '^models/Subscription/types/paymentPlanType';
import {SubscriptionBillingCycleDto} from '^models/Subscription/types/billingCycleType';
import {productApi} from '^models/Product/api';
import {errorNotify} from '^utils/toast-notify';
import {productIdParamsState} from '^atoms/common';
import {pagedResourceAtom} from '^hooks/usePagedResource';

export const productListResultAtom = pagedResourceAtom<ProductDto, FindAllProductQuery>({
    key: 'productListResultAtom',
});

// SaaS 컬렉션 / 목록 페이지 리스트
export const productsForSaaSCollection = pagedResourceAtom<ProductDto, FindAllProductQuery>({
    key: 'productsForSaaSCollection',
});

// SaaS 컬렉션 / 상세 페이지 - 유사한 서비스 리스트
export const anotherProductsForSaaSCollection = pagedResourceAtom<ProductDto, FindAllProductQuery>({
    key: 'anotherProductsForSaaSCollection',
});

// 조직 홈 - 앱 목록
export const productsOnMainPage = pagedResourceAtom<ProductDto, FindAllProductQuery>({
    key: 'productsOnMainPage',
});

export const productsAtom = atom({
    key: 'products',
    default: [] as ProductDto[],
});

export const productAtom = atom({
    key: 'product',
    default: null as ProductDto | null,
});

export const paymentPlanForCreateFlowAtom = atom({
    key: '@createFlow/paymentPlan',
    default: null as SubscriptionPaymentPlanDto | null,
});

export const billingCycleForCreateFlowAtom = atom({
    key: '@createFlow/billingCycle',
    default: null as SubscriptionBillingCycleDto | null,
});

/**
 * Products Basic CRUD
 */
export const productsState = atom({
    key: 'productsState',
    default: [] as ProductDto[],
});

export const getProductsParamsState = atom<FindAllProductQuery>({
    key: 'getProductsParamsState',
    default: {},
});

export const getProductsQuery = selector({
    key: 'getProductsQuery',
    get: async ({get}) => {
        const params = get(getProductsParamsState);

        try {
            const res = await productApi.index({
                ...params,
                isLive: params.isLive ?? true,
                itemsPerPage: 500,
            });
            return res.data;
        } catch (e) {
            errorNotify(e);
        }
    },
});

export const getProductQueryTrigger = atom({
    key: 'getProductQueryTrigger',
    default: 0,
});

/**
 * getProductQuery 는 현재, 동 페이지 내에서 주제로 사용되는 product 만을 취급 할 수 있습니다.
 * 이는 현재 버전이 "Current" 성격을 지닌다고 볼 수 있습니다.
 * 따라서 getProductQuery 는 getCurrentPrototypeQuery 로 변경되어야 합니다.
 * 또, 일반적으로 api 호출시에 사용할 올바른 getProductQuery 를 만들어야 합니다.
 */
export const getProductQuery = selector({
    key: 'getProductQuery',
    get: async ({get}) => {
        get(getProductQueryTrigger);
        const id = get(productIdParamsState);
        if (isNaN(id)) return;

        try {
            const res = await productApi.show(id);
            return res.data;
        } catch (e) {
            errorNotify(e);
        }
    },
    set: ({set}) => {
        set(getProductQueryTrigger, (v) => v + 1);
    },
});

export type PrototypePostDto = {
    thumbnailUrl?: string | null;
    logoImgUrl?: string | null;
    homepageUrl?: string | null;
    title: string;
    subTitle: string;
    tagNames: string[];
};

export const getProductPostContent = atom({
    key: 'productPostContent',
    default: {} as PrototypePostDto,
});
