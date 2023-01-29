import {useEffect, useState} from 'react';

export function useOnResize() {
    const [mobileView, setMobileView] = useState(false);

    const resizeHandler = () => {
        const width = window.innerWidth;
        setMobileView(width < 768);
    };

    useEffect(() => {
        window.addEventListener('resize', resizeHandler);
        return () => window.removeEventListener('resize', resizeHandler);
    }, []);

    return {mobileView};
}
