export function getQueryParams<T>(keys: string[]): T {
    const queryParams = new URLSearchParams(location.search);
    const data = {} as {[key: string]: any};
    keys.forEach((key) => {
        data[key] = queryParams.get(key);
    });
    return data as T;
}
