import {useEffect} from 'react';

export const useCalendly = () => {
    const loadCalendly = () => {
        if (!document.getElementById('calendly-css')) {
            const linkTag = document.createElement('link');
            linkTag.id = 'calendly-css';
            linkTag.href = 'https://assets.calendly.com/assets/external/widget.css';
            linkTag.rel = 'stylesheet';
            document.head.appendChild(linkTag);
        }

        if (!document.getElementById('calendly-js')) {
            const scriptTag = document.createElement('script');
            scriptTag.id = 'calendly-js';
            scriptTag.src = 'https://assets.calendly.com/assets/external/widget.js';
            scriptTag.type = 'text/javascript';
            scriptTag.async = true;
            document.head.appendChild(scriptTag);
        }
    };

    useEffect(() => {
        loadCalendly();
    }, []);

    const startCalendly = () => {
        const url = 'https://calendly.com/scordi_01republic';
        // @ts-ignore
        window.Calendly?.initPopupWidget({url});
        return false;
    };

    return {
        loadCalendly,
        startCalendly,
    };
};
