import {memo, useCallback, useEffect, useState} from 'react';

interface ScrollRightButtonProps {
    scrollContainer: HTMLDivElement;
}

export const ScrollRightButton = memo((props: ScrollRightButtonProps) => {
    const {scrollContainer} = props;
    const [isVisible, setIsVisible] = useState(false);

    const parentSection = scrollContainer.closest('section') as HTMLElement;

    useEffect(() => {
        updateVisible();
        scrollContainer.addEventListener('scroll', updateVisible);

        return () => {
            scrollContainer.removeEventListener('scroll', updateVisible);
        };
    }, []);

    const updateVisible = useCallback(() => {
        const scrollContainerWidth = scrollContainer.scrollWidth || 0;
        const parentSectionWidth = parentSection.clientWidth || 0;

        const {clientWidth = 0, scrollWidth = 0, scrollLeft = 0} = scrollContainer || {};
        const isRightEnded = clientWidth + scrollLeft > scrollWidth;

        setIsVisible(() => {
            if (isRightEnded) return false;
            if (parentSectionWidth >= scrollContainerWidth) return false;

            return true;
        });
    }, [scrollContainer, parentSection]);

    const handleScroll = () => {
        scrollContainer.scrollLeft += 400;
        updateVisible();
    };

    if (!isVisible) return <></>;

    return (
        <div className="absolute right-0 top-0 bottom-0 bg-white/70 pl-[6px]">
            <button
                onClick={handleScroll}
                className="btn btn-square btn-sm btn-ghost no-animation btn-animation !outline-0 "
            >
                ▶
            </button>
        </div>
    );
});
