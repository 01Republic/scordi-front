import {atom, useRecoilState, useRecoilValue, useSetRecoilState} from 'recoil';
import {prototypeIdParamsState} from '^atoms/common';
import {
    applicationPrototypeAtom,
    applicationPrototypesAtom,
    billingCycleForCreateFlowAtom,
    getPrototypePostContent,
    getPrototypeQuery,
    getPrototypesQuery,
    paymentPlanForCreateFlowAtom,
} from '^atoms/applicationPrototypes.atom';
import {useCallback, useEffect, useState} from 'react';
import {ApplicationPrototypeDto, FindAllAppPrototypeQuery} from '^types/applicationPrototype.type';
import {
    applicationPrototypeApi,
    getApplicationPrototype,
    getApplicationPrototypes,
} from '^api/applicationPrototype.api';
import {errorNotify} from '^utils/toast-notify';
import {ApplicationPaymentPlanDto} from '^types/applicationPaymentPlan.type';
import {useRouter} from 'next/router';

export const useApplicationPrototypes = () => {
    const result = useRecoilValue(getPrototypesQuery);
    return result || {items: undefined, pagination: {}};
};

export const prototypeSearchResultsState = atom({
    key: 'prototypeSearchResultsState',
    default: [] as ApplicationPrototypeDto[],
});

export const searchPrototypesParams = atom<FindAllAppPrototypeQuery>({
    key: 'prototypes/searchParams',
    default: {},
});

export const usePrototypeSearch = () => {
    const [results, setResults] = useRecoilState(prototypeSearchResultsState);
    const [query, setQuery] = useRecoilState(searchPrototypesParams);

    const searchPrototypes = useCallback((params: FindAllAppPrototypeQuery) => {
        setQuery(params);
        getApplicationPrototypes({
            isLive: params.isLive ?? true,
            itemsPerPage: 500,
            ...params,
        })
            .then((res) => setResults(res.data.items))
            .catch(errorNotify);
    }, []);

    const mutation = useCallback(() => searchPrototypes(query), [query]);

    const search = async (params: FindAllAppPrototypeQuery) => {
        if (JSON.stringify(query) === JSON.stringify(params)) return results;

        const data = await applicationPrototypeApi
            .index({
                itemsPerPage: 500,
                ...params,
            })
            .then((res) => res.data);

        setResults(data.items);
        setQuery(params);

        return data.items;
    };

    return {results, searchPrototypes, query, mutation, search};
};

// export const useApplicationPrototype = () => useRecoilValue(getPrototypeQuery);
export const useApplicationPrototype = () => useRecoilState(getPrototypeQuery);

// export const useApplicationPrototypes2 = (deps: any[]) => {
//     const [page, setPage] = useState<number>(0);
//     const [totalPage, setTotalPage] = useState<number>(0);
//     const [totalItemCount, setTotalItemCount] = useState<number>(0);
//     const [isLoading, setIsLoading] = useState<boolean>(false);
//     const [list, setList] = useRecoilState(applicationPrototypesAtom);
//
//     const fetch = (params: FindAllAppPrototypeQuery = {}) => {
//         params.where ||= {};
//         params.isLive ??= true;
//         setIsLoading(true);
//         getApplicationPrototypes(params)
//             .then(({data}) => {
//                 setPage(data.pagination.currentPage);
//                 setTotalPage(data.pagination.totalPage);
//                 setTotalItemCount(data.pagination.totalItemCount);
//                 setList(data.items);
//             })
//             .catch(errorNotify)
//             .finally(() => setIsLoading(false));
//     };
//
//     useEffect(() => {
//         fetch();
//     }, [...(deps ?? [])]);
//
//     return {
//         data: list,
//         fetch,
//         isLoading,
//         pagination: {
//             currentPage: page,
//             totalPage,
//             totalItemCount,
//         },
//     };
// };
//
// export const useApplicationPrototype2 = (id: number | null, deps: any[]) => {
//     const [isLoading, setIsLoading] = useState<boolean>(false);
//     const [prototype, setPrototype] = useRecoilState(applicationPrototypeAtom);
//
//     const fetchApplicationPrototype = (id: number) => {
//         setIsLoading(true);
//         getApplicationPrototype(id)
//             .then(({data}) => {
//                 setPrototype(data);
//             })
//             .catch(errorNotify)
//             .finally(() => setIsLoading(false));
//     };
//
//     useEffect(() => {
//         if (typeof id === 'number') fetchApplicationPrototype(id);
//     }, [id, ...(deps ?? [])]);
//
//     return {prototype, setPrototype, isLoading, fetchApplicationPrototype};
// };

export const usePaymentPlanForCreateFlow = (proto: ApplicationPrototypeDto | null | undefined, id: number) => {
    const [paymentPlan, setPaymentPlan] = useRecoilState(paymentPlanForCreateFlowAtom);

    useEffect(() => {
        if (!proto || isNaN(id)) return;
        const plan = proto.paymentPlans.find((plan) => plan.id === id);
        setPaymentPlan(plan || null);
    }, [proto, id]);

    return {paymentPlan, setPaymentPlan};
};

export const useBillingCycleForCreateFlow = (plan: ApplicationPaymentPlanDto | null | undefined, id: number) => {
    const [billingCycle, setBillingCycle] = useRecoilState(billingCycleForCreateFlowAtom);

    useEffect(() => {
        if (!plan || isNaN(id)) return;
        const cycle = plan.billingCycles.find((plan) => plan.id === id);
        setBillingCycle(cycle || null);
    }, [plan, id]);

    return {billingCycle, setBillingCycle};
};

export const useCreateFlow = () => {
    const router = useRouter();
    const prototypeId = Number(router.query.prototypeId);
    const planId = Number(router.query.planId);
    const cycleId = Number(router.query.cycleId);
    const [prototype] = useApplicationPrototype();
    const planHook = usePaymentPlanForCreateFlow(prototype, planId);
    const cycleHook = useBillingCycleForCreateFlow(planHook.paymentPlan, cycleId);
    const setPrototypeIdParam = useSetRecoilState(prototypeIdParamsState);

    useEffect(() => {
        setPrototypeIdParam(prototypeId);
    }, [prototypeId]);

    return {
        prototypeId,
        paymentPlanId: planId,
        billingCycleId: cycleId,
        prototype,
        ...planHook,
        ...cycleHook,
    };
};

export const usePrototypePostContent = () => {
    const makeContent = (prototype: ApplicationPrototypeDto) => {
        const [post] = prototype.posts;

        const title = prototype?.name ?? post?.title ?? 'untitled';
        const shortName = title.split(' ')[0];

        const thumbnailUrl =
            post?.thumbnailUrl ?? prototype?.ogImageUrl ?? `https://placehold.co/1200x630?text=${shortName}`;
        const logoImgUrl = prototype?.image || `https://placehold.co/200x200?text=${shortName}`;
        const homePageUrl = prototype?.homepageUrl ?? null;

        const subTitle = prototype?.tagline ?? post?.seoDescription ?? 'unset';
        const tags = prototype?.tags ?? post.tags ?? [];
        const tagNames = tags.map((tag) => tag.name);

        return {thumbnailUrl, logoImgUrl, homePageUrl, shortName, title, subTitle, tagNames};
    };

    return {makeContent};
};
