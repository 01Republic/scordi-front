import React, {memo} from 'react';
import {ListFilter} from 'lucide-react';
import Tippy from '@tippyjs/react';

interface TableFilterButtonProps {
    isActive?: boolean;
    onClick?: () => any;
}

export const TableFilterButton = memo((props: TableFilterButtonProps) => {
    const {isActive = false, onClick} = props;

    return (
        <Tippy content="필터" className="text-12">
            <button
                onClick={onClick}
                className={`w-5 h-5 flex items-center justify-center rounded-sm ${
                    isActive ? 'text-scordi bg-primaryColor-bg' : 'hover:bg-primaryColor-bg'
                }`}
            >
                <ListFilter />
            </button>
        </Tippy>
    );
});
TableFilterButton.displayName = 'TableFilterButton';
