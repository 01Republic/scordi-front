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

export const parseQueryValue = (value: string | string[] | undefined): string => {
    return [value].flat().join(',') || '';
};

export const urlWithQuery = (args: string[] = []) => {
    const base = window.location.origin + window.location.pathname;
    const query = args.join('&');
    return [base, query].filter((e) => e).join('?');
};
