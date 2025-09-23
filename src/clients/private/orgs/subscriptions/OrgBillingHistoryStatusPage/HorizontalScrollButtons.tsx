import React, {memo, MutableRefObject} from 'react';
import Tippy from '@tippyjs/react';
import {ChevronLeft, ChevronRight} from 'lucide-react';
import {useHorizontalScroll} from '^hooks/useHorizontalScroll';

interface HorizontalScrollButtonsProps {
    xScrollTargetRef: MutableRefObject<HTMLDivElement | null>;
}

export const HorizontalScrollButtons = memo((props: HorizontalScrollButtonsProps) => {
    const {xScrollTargetRef} = props;
    const {isLeftEnded, isRightEnded, handleScroll} = useHorizontalScroll(xScrollTargetRef.current);

    return (
        <div className="flex items-center justify-end pr-6 mb-[-2.8rem] gap-3 sticky top-[70px] z-10 select-none">
            {isLeftEnded ? (
                <button
                    type="button"
                    className="btn btn-sm btn-white btn-square no-animation btn-animation select-none pointer-events-none opacity-30"
                >
                    <ChevronLeft fontSize={20} />
                </button>
            ) : (
                <Tippy content="클릭하여 왼쪽으로 스크롤" className="text-12">
                    <div>
                        <button
                            type="button"
                            className="btn btn-sm btn-white btn-square no-animation btn-animation select-none"
                            onClick={() => {
                                xScrollTargetRef.current && handleScroll(xScrollTargetRef.current, -400);
                            }}
                        >
                            <ChevronLeft fontSize={20} />
                        </button>
                    </div>
                </Tippy>
            )}

            {isRightEnded ? (
                <button
                    type="button"
                    className="btn btn-sm btn-white btn-square no-animation btn-animation select-none pointer-events-none opacity-30"
                >
                    <ChevronRight fontSize={20} />
                </button>
            ) : (
                <Tippy content="클릭하여 오른쪽으로 스크롤" className="text-12">
                    <div>
                        <button
                            type="button"
                            className="btn btn-sm btn-white btn-square no-animation btn-animation select-none"
                            onClick={() => {
                                xScrollTargetRef.current && handleScroll(xScrollTargetRef.current, 400);
                            }}
                        >
                            <ChevronRight fontSize={20} />
                        </button>
                    </div>
                </Tippy>
            )}
        </div>
    );
});
HorizontalScrollButtons.displayName = 'HorizontalScrollButtons';
