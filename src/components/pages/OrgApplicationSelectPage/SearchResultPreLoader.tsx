import {memo} from 'react';
import {PreLoader} from '^components/PreLoader';

export const SearchResultPreLoader = memo(() => {
    return (
        <div className="w-full min-h-[12rem]">
            <PreLoader screenSize={false} />
        </div>
    );
});
