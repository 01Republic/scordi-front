import {atom, RecoilState, useSetRecoilState} from 'recoil';
import {NextRouter, useRouter} from 'next/router';
import {useEffect} from 'react';

// Ex: const billingHistoryId = useRouterIdParamState('billingHistoryId', billingHistoryIdParamState);
export const useRouterIdParamState = (idParamNameOrValue: string | number, atom: RecoilState<number>) => {
    const router = useRouter();
    const id = typeof idParamNameOrValue === 'number' ? idParamNameOrValue : Number(router.query[idParamNameOrValue]);
    const setId = useSetRecoilState(atom);

    useEffect(() => {
        setId(id);
    }, [id]);

    return id;
};

// Ex: const billingHistoryId = useRouterParamState((r) => Number(r.query.billingHistoryId), billingHistoryIdParamState);
export const useRouterParamState = <T,>(cb: (router: NextRouter) => T, atom: RecoilState<T>) => {
    const router = useRouter();
    const val = cb(router);
    const setVal = useSetRecoilState(atom);

    useEffect(() => {
        setVal(val);
    }, [val]);

    return val;
};

export const orgIdParamState = atom({
    key: 'orgIdParamState',
    default: NaN,
});

export const productIdParamsState = atom({
    key: 'productIdParamsState',
    default: NaN,
});

export const invoiceAccountIdParamState = atom({
    key: 'invoiceAccountIdParamState',
    default: NaN,
});

export const subscriptionIdParamState = atom({
    key: 'subscriptionIdParamState',
    default: NaN,
});

export const billingHistoryIdParamState = atom({
    key: 'billingHistoryIdParamState',
    default: NaN,
});

export const tagIdParamState = atom({
    key: 'tagIdParamState',
    default: NaN,
});

export const teamIdParamState = atom({
    key: 'teamIdParamState',
    default: NaN,
});

export const teamMemberIdParamState = atom({
    key: 'teamMemberIdParamState',
    default: NaN,
});
