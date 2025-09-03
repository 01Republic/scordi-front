import {Props} from '^types/page';
import {NextFetchEvent, NextRequest} from 'next/server';
import {isLoggable} from '^config/environments';

const logger =
    (prefix: string) =>
    (...args: any[]) =>
        console.log(prefix, '|', ...args);

export const accessLog = (request: NextRequest, event: NextFetchEvent) => {
    if (request.nextUrl.pathname.startsWith('/_next')) return;
    if (request.nextUrl.pathname.endsWith('.png')) return;

    const {pathname, origin} = request.nextUrl;
    const params = Object.fromEntries(request.nextUrl.searchParams);

    const accessTime = new Date().toISOString();
    const prefix = `[NextJS Access BL] (${accessTime})`;
    const log = logger(prefix);

    log('Started', `"${pathname}"`, 'on', origin);
    log('Parameters:', params);
};

export const accessLog2 = (props: Props) => {
    const {Component, router, pageProps} = props;
    const accessTime = new Date().toISOString();
    const prefix = `[NextJS Access FL] (${accessTime})`;
    const log = logger(prefix);

    const layoutName = Component.getLayout ? `${Component.getLayout.name}()` : 'no layout';
    const fallbackInfo = `(fallback: ${router.isFallback}, defaultLocale: ${router.defaultLocale})`;

    log('Routed', `"${router.asPath}"`);
    log('Rendering by', Component.name, 'with', layoutName, fallbackInfo);
    log('Query:', router.query);
    log('Props:', pageProps);
    log('=====================================');
};

export const log2 = (...args: any[]) => isLoggable() && console.log(...args);
