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
