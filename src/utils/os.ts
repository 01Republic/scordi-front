import {isDefinedValue} from '^utils/array';

export const getOS = () => {
    if (!window || typeof window !== 'object') return;

    const userAgent = window.navigator.userAgent.toLowerCase();
    const platform = window.navigator.platform;

    if (/android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent)) {
        return 'Mobile';
    }

    if (userAgent.includes('mac') || platform.toLowerCase().includes('mac')) {
        return 'MacOS';
    }
    if (userAgent.includes('win') || platform.toLowerCase().includes('win')) {
        return 'Windows';
    }
    if (userAgent.includes('linux')) {
        return 'Linux';
    }
};

export const keyboardKeyIcons = {
    join: () => (getOS() === 'MacOS' ? '' : '+'),
    ctrl: () => (getOS() === 'MacOS' ? '⌃' : 'Ctrl'),
    shift: () => (getOS() === 'MacOS' ? '⇧' : 'Shift'),
    alt: () => (getOS() === 'MacOS' ? '⌥' : 'Alt'),
    cmd: () => (getOS() === 'MacOS' ? '⌘' : 'fn'),
    arrowLeft: () => '←',
    arrowRight: () => '→',
    arrowUp: () => '↑',
    arrowDown: () => '↓',
    escape: () => (getOS() === 'MacOS' ? '⎋' : 'ESC'),
    enter: () => '↩',
    tab: () => '⇥',
    backTab: () => '⇤',
    capsLock: () => '⇪',
    func: () => 'fn',
};

export const composeKeyIcons = (...keys: (keyof typeof keyboardKeyIcons)[]): string => {
    return keys
        .map((key) => keyboardKeyIcons[key])
        .filter(isDefinedValue)
        .map((keyFn) => keyFn())
        .join(keyboardKeyIcons.join());
};
