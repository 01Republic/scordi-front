import React, {memo} from 'react';
import {ChevronLeft, ChevronRight} from 'lucide-react';
interface Props {
    prevDisabled: boolean;
    nextDisabled: boolean;
    onPrev: () => any;
    onNext: () => any;
}

export const NextPrevNavigator = memo((props: Props) => {
    const {prevDisabled, nextDisabled, onPrev, onNext} = props;

    return (
        <div className="flex items-center gap-2">
            <button
                className="btn btn-sm btn-ghost btn-circle"
                disabled={prevDisabled}
                onClick={() => !prevDisabled && onPrev()}
            >
                <ChevronLeft />
            </button>

            <button
                className="btn btn-sm btn-ghost btn-circle"
                disabled={nextDisabled}
                onClick={() => !nextDisabled && onNext()}
            >
                <ChevronRight />
            </button>
        </div>
    );
});
