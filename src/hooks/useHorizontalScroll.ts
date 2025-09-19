import {useCallback, useEffect, useMemo, useState} from 'react';

interface UseHorizontalScrollOption {
    targetElem: HTMLElement;
    direct: 'left' | 'right';
}

export function useHorizontalScroll(option: UseHorizontalScrollOption) {
    const {targetElem, direct} = option;
    const [isVisible, setIsVisible] = useState(false);

    const updateVisible = useCallback((elem: HTMLElement) => {
        const {clientWidth = 0, scrollWidth = 0, scrollLeft = 0} = elem;

        const isScrollable = scrollWidth > clientWidth;

        const isEnded =
            direct === 'left'
                ? scrollLeft <= 0 // 현위치가 왼쪽 끝 인지 확인
                : clientWidth + scrollLeft >= scrollWidth; // 가용영역 이상 스크롤 했는지 확인

        setIsVisible(isScrollable && !isEnded);
    }, []);

    const handleScroll = useCallback(
        (elem: HTMLElement, scrollSize: number) => {
            elem.scrollLeft += scrollSize;
            updateVisible(elem);
        },
        [updateVisible],
    );

    useEffect(() => {
        const onScroll = () => updateVisible(targetElem);

        setTimeout(onScroll, 100);
        targetElem.addEventListener('scroll', onScroll);
        return () => {
            targetElem.removeEventListener('scroll', onScroll);
        };
    }, [targetElem, updateVisible]);

    return {isVisible, handleScroll};
}
