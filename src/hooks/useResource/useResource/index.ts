import {RecoilState, useRecoilState, useRecoilValue} from 'recoil';
import {AxiosResponse} from 'axios';
import {orgIdParamState} from '^atoms/common';
import {useState} from 'react';

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
