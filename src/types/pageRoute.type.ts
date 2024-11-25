// export types PageRoute<T> = {
//     pathname: string;
//     // path: <T extends Array<infer P>>(...args: T) => string;
//     path: (...args: T extends (...args: infer P) => any ? P : never[]) => string;
// };

// types PageRoute<T> = {pathname: string; path: T};

import {serviceHost} from '^config/environments';
import {NextRouter} from 'next/router';

export const pathRoute = <T extends Function, ETC>(route: {pathname: string; path: T} & ETC) => {
    const origin = serviceHost;

    const url = ((...args: any[]) => `${origin}${route.path(...args)}`) as unknown as T;
    return {...route, url};
};

export const pathReplace = <T extends {}, Q extends {}>(pathname: string, params?: T, query?: Q): string => {
    params ||= {} as T;
    Object.entries(params).forEach(([k, v]) => {
        pathname = pathname.replace(`[${k}]`, String(v));
    });
    return pathname;
};

export class ActiveRoute<T extends (...args: any) => any> {
    route: {pathname: string; path: T};
    router: NextRouter;
    params: Parameters<T>;

    constructor(route: {pathname: string; path: T}, router: NextRouter, ...params: Parameters<T>) {
        this.route = route;
        this.router = router;
        this.params = params;
    }

    static props<T extends (...args: any) => any>(
        route: {pathname: string; path: T},
        router: NextRouter,
        ...params: Parameters<T>
    ) {
        return new this(route, router, ...params).props;
    }

    isActive() {
        return this.route.pathname === this.router.route;
    }

    get active() {
        return this.isActive();
    }

    path(...args: Parameters<T>) {
        return this.route.path(...args);
    }

    get href() {
        return this.path(...this.params);
    }

    get props() {
        return {active: this.active, href: this.href};
    }
}
