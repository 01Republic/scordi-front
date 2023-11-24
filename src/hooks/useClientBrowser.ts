import {useEffect} from 'react';

export enum BrowserNames {
    naver = 'naver',
    whale = 'whale',
    safari = 'safari',
    chrome = 'chrome',
    firefox = 'firefox',
    etc = 'etc',
}

export const useClientBrowser = () => {
    useEffect(() => {
        if (typeof window === 'undefined') return;

        Object.values(BrowserNames).forEach((name) => {
            window.document.body.classList.remove(`browser--${name}`);
        });

        const name = parseBrowserName(window);
        window.document.body.classList.add(`browser--${name}`);
    }, []);
};

function parseBrowserName(window: Window): BrowserNames {
    const {navigator} = window;
    const {userAgent, appVersion} = navigator;

    const ua = userAgent.toLowerCase();
    if (ua.includes('whale')) return BrowserNames.whale;
    if (ua.includes('naver')) return BrowserNames.naver;
    if (ua.includes('chrome')) return BrowserNames.chrome;
    if (ua.includes('safari')) return BrowserNames.safari;
    return BrowserNames.etc;
}
