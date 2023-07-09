import React, {memo, useState} from 'react';
import {useDraft, useDraftResult} from '../hooks/useDraft';
import {monthBefore} from '^utils/dateTime';
import {dayjs} from '^utils/dayjs';

export const LoadMoreDraftButton = memo(() => {
    const {fetchMonthBefore} = useDraft();
    const {draftSearchFrom} = useDraftResult();
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const loadMore = () => {
        setIsLoading(true);
        fetchMonthBefore(1).then(() => {
            setIsLoading(false);
        });
    };

    if (isLoading) {
        return (
            <button className="btn btn-link normal-case" disabled>
                Loading ...
            </button>
        );
    } else {
        return (
            <button className="btn btn-link normal-case w-full" onClick={() => loadMore()}>
                {draftSearchFrom ? loadMoreText(draftSearchFrom) : 'Load a month more ...'}
            </button>
        );
    }
});

function loadMoreText(lastSearched: Date) {
    const now = new Date();
    const date = new Date(lastSearched);
    date.setMonth(date.getMonth() - 1);
    date.setDate(date.getDate() - 1);

    const words = ['Load'];
    if (now.getFullYear() === date.getFullYear()) {
        words.push(dayjs(date).format('MMMM'));
    } else {
        words.push(dayjs(date).format('ll'));
    }
    words.push('...');

    return words.join(' ');
}
