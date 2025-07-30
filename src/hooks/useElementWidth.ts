import {useRef, useState, useLayoutEffect} from 'react';

export function useElementWidth<T extends HTMLElement>() {
    const triggerRef = useRef<T>(null);
    const [width, setWidth] = useState(0);

    useLayoutEffect(() => {
        const element = triggerRef.current;
        if (!element) return;

        const updateWidth = () => {
            setWidth(element.getBoundingClientRect().width);
        };

        // 초기 측정
        updateWidth();

        //trigger 자체의 크기 변화 감지
        const resizeObserver = new ResizeObserver(updateWidth);
        resizeObserver.observe(element);

        // 윈도우 리사이즈 대응
        window.addEventListener('resize', updateWidth);

        return () => {
            resizeObserver.disconnect();
            window.removeEventListener('resize', updateWidth);
        };
    }, []);

    return [triggerRef, width] as const;
}
