import React, {memo} from 'react';
import {ChevronDown, Plus} from 'lucide-react';

interface ListPageDropdownButtonProps {
    text?: string;
}

export const ListPageDropdownButton = memo((props: ListPageDropdownButtonProps) => {
    const {text = '추가하기'} = props;

    return (
        <button tabIndex={0} className="btn btn-scordi gap-2 mb-1 no-animation btn-animation">
            <Plus />
            <span className="mr-1.5">{text}</span>
            <ChevronDown />
        </button>
    );
});
ListPageDropdownButton.displayName = 'ListPageDropdownButton';
