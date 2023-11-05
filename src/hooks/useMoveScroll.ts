import {useRef} from 'react';

export const useMoveScroll = () => {
    const selectRef = useRef<HTMLDivElement>(null);

    const onScroll = () => {
        selectRef.current?.scrollIntoView({behavior: 'smooth'});
    };

    return {selectRef, onScroll};
};
