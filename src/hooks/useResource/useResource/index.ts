import {atom, RecoilState, useRecoilState, useRecoilValue, useResetRecoilState} from 'recoil';
import {AxiosResponse} from 'axios';
import {orgIdParamState} from '^atoms/common';
import {useEffect, useState} from 'react';

interface UseResourceOption<DTO, ResourceId = number, QueryParam = any> {
    endpoint: (resourceId: ResourceId, params: QueryParam, orgId: number) => Promise<AxiosResponse<DTO>>;
    resultAtom: RecoilState<DTO>;
    resourceIdAtom: RecoilState<ResourceId>;
    paramAtom?: RecoilState<QueryParam>;
    defaultParams?: QueryParam;
    useOrgId?: boolean;
}

export function useResource<DTO, ResourceId = number, QueryParam = any>(
    option: UseResourceOption<DTO, ResourceId, QueryParam>,
) {
    const {endpoint, resultAtom, resourceIdAtom, paramAtom, defaultParams = {} as QueryParam, useOrgId = true} = option;

    const orgId = useRecoilValue(orgIdParamState);
    const [result, setResult] = useRecoilState(resultAtom);
    const [resourceId, setResourceId] = useRecoilState(resourceIdAtom);
    const [param, setParam] = paramAtom ? useRecoilState(paramAtom) : [];
    const [isLoading, setIsLoading] = useState(false);

    async function getOne(resourceId: ResourceId, params = {} as QueryParam, force = false) {
        if (useOrgId) {
            if (!orgId || isNaN(orgId)) return;
        }
        params = {...defaultParams, ...params} as QueryParam;
        const request = () => {
            setIsLoading(true);
            return endpoint(resourceId, params, orgId).finally(() => {
                setTimeout(() => setIsLoading(false), 200);
            });
        };

        return new Promise((resolve, reject) => {
            setResourceId((prevId) => {
                if (!force && prevId === resourceId) {
                    resolve(result);
                    return prevId;
                }

                const req = request().then((res) => res.data);
                req.then((data) => {
                    resolve(data);
                    setResult(data);
                });

                return resourceId;
            });
        });
    }

    const reload = () => getOne(resourceId, param, true);

    return {resourceId, param, result, getOne, reload};
}

interface ResourceAtomsOption<DTO> {
    // 생상할 아톰의 키가 됩니다.
    key: string;
}

export interface ResourceAtomsConfig<DTO> {
    resultAtom: RecoilState<DTO | null>;
    queryAtom: RecoilState<object>;
    isLoadingAtom: RecoilState<boolean>;
}

export function resourceAtoms<DTO>(option: ResourceAtomsOption<DTO>): ResourceAtomsConfig<DTO> {
    const {key} = option;

    const resultAtom = atom<DTO | null>({
        key: `Resource/resultAtom/${key}`,
        default: null,
    });

    const queryAtom = atom<object>({
        key: `Resource/queryAtom/${key}`,
        default: {},
    });

    const isLoadingAtom = atom<boolean>({
        key: `Resource/isLoadingAtom/${key}`,
        default: false,
    });

    return {resultAtom, queryAtom, isLoadingAtom};
}

export const useResource2 = <T>(atoms: ResourceAtomsConfig<T>, request: (orgId: number, id: number) => Promise<T>) => {
    const {resultAtom, queryAtom, isLoadingAtom} = atoms;
    const [data, setData] = useRecoilState(resultAtom);
    const resetData = useResetRecoilState(resultAtom);
    const [query, setQuery] = useRecoilState(queryAtom);
    const [isLoading, setIsLoading] = useRecoilState(isLoadingAtom);
    const [__isLoading, __setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(__isLoading);
    }, [__isLoading]);

    const search = (orgId: number, id: number, force = false) => {
        if (!orgId || isNaN(orgId) || !id || isNaN(id)) return;
        const params = {orgId, id};

        return new Promise((resolve, reject) => {
            setQuery((oldQuery) => {
                if (!force && JSON.stringify(oldQuery) === JSON.stringify(params)) {
                    reject();
                    return oldQuery;
                }

                __setIsLoading(true);
                request(orgId, id)
                    .then((d) => {
                        resolve(d);
                        setData(d);
                    })
                    .catch(reject)
                    .finally(() => {
                        setTimeout(() => __setIsLoading(false), 200);
                    });

                return params;
            });
        });
    };

    // @ts-ignore
    const reload = () => search(query.orgId, query.id, true);

    return {
        isLoading,
        data,
        search,
        reload,
    };
};
