import {memo} from 'react';
import {useHorizontalScroll} from '^hooks/useHorizontalScroll';

interface ScrollRightButtonProps {
    scrollContainer: HTMLDivElement;
}

export const ScrollRightButton = memo((props: ScrollRightButtonProps) => {
    const {scrollContainer} = props;
    const {isScrollable, isRightEnded, handleScroll} = useHorizontalScroll(scrollContainer);

    if (!isScrollable) return <></>;
    if (isRightEnded) return <></>;

    return (
        <div className="absolute right-0 top-0 bottom-0 bg-white/70 pl-[6px]">
            <button
                onClick={() => handleScroll(scrollContainer, 400)}
                className="btn btn-square btn-sm btn-ghost no-animation btn-animation !outline-0 "
            >
                ▶
            </button>
        </div>
    );
});
