import {useCallback, useEffect, useMemo, useState} from 'react';

interface UseHorizontalScrollOption {
    // targetElem: HTMLElement;
}

export function useHorizontalScroll(targetElem: HTMLElement | null, option: UseHorizontalScrollOption = {}) {
    const {} = option;
    const [isScrollable, setIsScrollable] = useState(false);
    const [isLeftEnded, setIsLeftEnded] = useState(false);
    const [isRightEnded, setIsRightEnded] = useState(false);

    const updateVisible = useCallback((elem: HTMLElement) => {
        const {clientWidth = 0, scrollWidth = 0, scrollLeft = 0} = elem;

        // 주어진 요소가 스크롤이 가능한 요소인지 확인
        setIsScrollable(scrollWidth > clientWidth);

        // 현위치가 왼쪽 끝 인지 확인
        setIsLeftEnded(scrollLeft <= 0);

        // 가용영역 이상 스크롤 했는지 확인
        setIsRightEnded(clientWidth + scrollLeft >= scrollWidth);
    }, []);

    const handleScroll = useCallback(
        (elem: HTMLElement, scrollSize: number) => {
            elem.scrollLeft += scrollSize;
            updateVisible(elem);
        },
        [updateVisible],
    );

    useEffect(() => {
        const onScroll = () => targetElem && updateVisible(targetElem);

        setTimeout(onScroll, 100);
        targetElem?.addEventListener('scroll', onScroll);
        return () => {
            targetElem?.removeEventListener('scroll', onScroll);
        };
    }, [targetElem, updateVisible]);

    return {isScrollable, isLeftEnded, isRightEnded, handleScroll};
}
