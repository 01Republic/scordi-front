import React, {memo} from 'react';
import {FaChevronLeft} from '@react-icons/all-files/fa/FaChevronLeft';
import {FaChevronRight} from '@react-icons/all-files/fa/FaChevronRight';

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
                <FaChevronLeft />
            </button>

            <button
                className="btn btn-sm btn-ghost btn-circle"
                disabled={nextDisabled}
                onClick={() => !nextDisabled && onNext()}
            >
                <FaChevronRight />
            </button>
        </div>
    );
});
