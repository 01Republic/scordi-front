import {NextRouter} from 'next/router';

export function getQueryParams<T>(keys: string[]): T {
    const queryParams = new URLSearchParams(location.search);
    const data = {} as {[key: string]: any};
    keys.forEach((key) => {
        data[key] = queryParams.get(key);
    });
    return data as T;
}

export const buildUrl = (baseUrl: string, params: Record<string, any>) => {
    const queryString = Object.entries(params)
        .map(([k, v]) => [k, v].join('='))
        .join('&');
    return [baseUrl, queryString].join('?');
};

export const onlyPath = (router: NextRouter) => {
    const {query, route} = router;
    return Object.entries(query).reduce((path, [k, v]) => path.replace(`[${k}]`, `${v}`), route);
};
