// export type PageRoute<T> = {
//     pathname: string;
//     // path: <T extends Array<infer P>>(...args: T) => string;
//     path: (...args: T extends (...args: infer P) => any ? P : never[]) => string;
// };

// type PageRoute<T> = {pathname: string; path: T};

export const pathRoute = <T>(route: {pathname: string; path: T}) => route;

export const pathReplace = <T extends {}>(pathname: string, params?: T): string => {
    params ||= {} as T;
    Object.entries(params).forEach(([k, v]) => {
        pathname = pathname.replace(`[${k}]`, String(v));
    });
    return pathname;
};
