import React, {memo} from 'react';
import {IoMdRefresh} from '@react-icons/all-files/io/IoMdRefresh';

interface PageRefreshButtonProps {
    isLoading: boolean;
    onClick: () => any;
}

export const PageRefreshButton = memo((props: PageRefreshButtonProps) => {
    const {isLoading, onClick} = props;

    return (
        <button
            className={`btn btn-xs btn-gray btn-circle ml-auto mr-2 ${
                isLoading ? 'animate-spin pointer-events-none opacity-50' : ''
            }`}
            onClick={() => onClick()}
        >
            <IoMdRefresh fontSize={14} />
        </button>
    );
});
PageRefreshButton.displayName = 'PageRefreshButton';
