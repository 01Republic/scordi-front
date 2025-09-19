import {memo} from 'react';
import {useHorizontalScroll} from '^hooks/useHorizontalScroll';

interface ScrollLeftButtonProps {
    scrollContainer: HTMLDivElement;
}

export const ScrollLeftButton = memo((props: ScrollLeftButtonProps) => {
    const {scrollContainer} = props;
    const {isScrollable, isLeftEnded, handleScroll} = useHorizontalScroll(scrollContainer);

    if (!isScrollable) return <></>;
    if (isLeftEnded) return <></>;

    return (
        <div className="absolute left-0 top-0 bottom-0 bg-white/70 pr-[6px] z-10">
            <button
                onClick={() => handleScroll(scrollContainer, -400)}
                className="btn btn-square btn-sm btn-ghost no-animation btn-animation !outline-0 "
            >
                ◀︎
            </button>
        </div>
    );
});
