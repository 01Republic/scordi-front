import React, {memo, useState} from 'react';
import {useDraft} from '^components/pages/LandingPages/TastingPage/hooks/useDraft';

export const LoadMoreDraftButton = memo(() => {
    const {fetchMonthBefore} = useDraft();
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
            <button className="btn btn-link normal-case" onClick={() => loadMore()}>
                Load a month more ...
            </button>
        );
    }
});
