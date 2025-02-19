import React, {memo} from 'react';
import {FaChevronLeft} from '@react-icons/all-files/fa/FaChevronLeft';
import {FaChevronRight} from '@react-icons/all-files/fa/FaChevronRight';

interface NextPrevNavigatorProps {
    currentPageNum: number;
    pageTokens: string[];
    nextPageToken?: string;
    onPrev: (pageToken: string) => any;
    onNext: (pageToken: string) => any;
}

export const NextPrevNavigator = memo((props: NextPrevNavigatorProps) => {
    const {currentPageNum, pageTokens, nextPageToken, onPrev, onNext} = props;

    return (
        <div className="flex items-center gap-2">
            <button
                className="btn btn-sm btn-ghost btn-circle"
                disabled={currentPageNum == 1}
                onClick={() => {
                    const currentPageIndex = currentPageNum - 1;
                    const pageToken = pageTokens[currentPageIndex - 1];
                    if (typeof pageToken !== 'undefined') onPrev(pageToken);
                }}
            >
                <FaChevronLeft />
            </button>

            <button
                className="btn btn-sm btn-ghost btn-circle"
                disabled={!nextPageToken}
                onClick={() => {
                    const pageToken = nextPageToken;
                    if (pageToken) onNext(pageToken);
                }}
            >
                <FaChevronRight />
            </button>
        </div>
    );
});
NextPrevNavigator.displayName = 'NextPrevNavigator';
