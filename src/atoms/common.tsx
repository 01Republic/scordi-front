import {useEffect, useSyncExternalStore} from 'react';
import {atom, RecoilState, useSetRecoilState} from 'recoil';
import {NextRouter, useRouter} from 'next/router';
import {GoogleTokenDataDto} from '^models/GoogleTokenData/type';

// Ex: const billingHistoryId = useRouterIdParamState('billingHistoryId', billingHistoryIdParamState);
export const useRouterIdParamState = (idParamNameOrValue: string | number, atom: RecoilState<number>) => {
    const router = useRouter();
    const id = typeof idParamNameOrValue === 'number' ? idParamNameOrValue : Number(router.query[idParamNameOrValue]);
    const setId = useSetRecoilState(atom);

    useEffect(() => {
        if (id && !isNaN(id)) setId(id);
    }, [id]);

    return id;
};

export const useRouterIdParamState2 = (idParamNameOrValue: string | number, atom: RecoilState<number>) => {
    const router = useRouter();
    const setId = useSetRecoilState(atom);
    const subscribe = () => {
        if (id && !isNaN(id)) setId(id);

        return () => {
            //
        };
    };

    const getSnapshot = () => {
        return typeof idParamNameOrValue === 'number' ? idParamNameOrValue : Number(router.query[idParamNameOrValue]);
    };

    const id = useSyncExternalStore(subscribe, getSnapshot, () => 1);

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

// useRecoilValue(orgIdParamState) => useOrgIdParam(); 로 교체
export const useOrgIdParam = (key = 'id') => Number(useRouter().query[key]);
export const useIdParam = (key = 'id') => Number(useRouter().query[key]);

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

export const creditCardIdParamState = atom({
    key: 'creditCardIdParamState',
    default: NaN,
});

export const codefAccountIdParamState = atom({
    key: 'codefAccountIdParamState',
    default: NaN,
});

export const bankAccountIdParamState = atom({
    key: 'bankAccountIdParamState',
    default: NaN,
});

export const googleTokenDataAtom = atom<GoogleTokenDataDto | null>({
    key: 'googleTokenData',
    default: null,
});
