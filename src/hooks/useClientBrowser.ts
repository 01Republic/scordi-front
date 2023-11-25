import {useEffect} from 'react';
import {atom, useRecoilValue, useSetRecoilState} from 'recoil';

export enum UserOS {
    macbook = 'macbook',
    iphone = 'iphone',
    android = 'android',
    windows = 'windows',
    unknown = 'unknown',
}

export enum BrowserNames {
    chrome = 'chrome',
    safari = 'safari',
    firefox = 'firefox',
    kakaotalkWebview = 'kakaotalkWebview',
    naverWebview = 'naverWebview',
    whale = 'whale',
    edge = 'edge',
    ie = 'ie',
    unknown = 'unknown',
}

interface ClientBrowserInfo {
    os: UserOS;
    browser: BrowserNames;
}

export const clientBrowserState = atom<ClientBrowserInfo>({
    key: 'clientBrowserState',
    default: {os: UserOS.unknown, browser: BrowserNames.unknown},
});

export const useSetClientBrowser = () => {
    const setInfo = useSetRecoilState(clientBrowserState);

    useEffect(() => {
        if (typeof window === 'undefined') return;

        Object.values(BrowserNames).forEach((name) => {
            window.document.body.classList.remove(`browser--${name}`);
        });

        const os = parseClientOS(window);
        const browser = parseBrowserName(window);
        window.document.body.classList.add(`browser--${browser}`);
        setInfo({os, browser});
    }, []);
};

export const useGetClientBrowser = () => useRecoilValue(clientBrowserState);

/**
 * Detecting methods
 */

//
export function parseClientOS(window: Window): UserOS {
    const {navigator} = window;
    const {userAgent} = navigator;
    const ua = userAgent.toLowerCase();

    if (ua.includes('macintosh;')) return UserOS.macbook;
    if (ua.includes('iphone;')) return UserOS.iphone;
    if (ua.includes('linux; android')) return UserOS.android;
    if (ua.includes('windows nt')) return UserOS.windows;
    return UserOS.unknown;
}

//
export function parseBrowserName(window: Window): BrowserNames {
    const {navigator} = window;
    const {userAgent, appVersion} = navigator;
    const ua = userAgent.toLowerCase();

    if (ua.includes('mobile') && ua.includes('kakaotalk')) return BrowserNames.kakaotalkWebview;
    if (ua.includes('naver(inapp')) return BrowserNames.naverWebview;
    if (ua.includes('whale')) return BrowserNames.whale;
    if (ua.includes('edg/')) return BrowserNames.edge;
    if (ua.includes('.net')) return BrowserNames.ie;
    if (ua.includes('chrome')) return BrowserNames.chrome;
    if (ua.includes('safari')) return BrowserNames.safari;
    if (ua.includes('firefox/')) return BrowserNames.firefox;
    return BrowserNames.unknown;
}
