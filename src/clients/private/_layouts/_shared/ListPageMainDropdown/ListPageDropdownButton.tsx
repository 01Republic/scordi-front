import React, {memo} from 'react';
import {FaCaretDown, FaPlus} from 'react-icons/fa6';

interface ListPageDropdownButtonProps {
    text?: string;
}

export const ListPageDropdownButton = memo((props: ListPageDropdownButtonProps) => {
    const {text = '추가하기'} = props;

    return (
        <button tabIndex={0} className="btn btn-scordi gap-2 mb-1">
            <FaPlus />
            <span className="mr-1.5">{text}</span>
            <FaCaretDown />
        </button>
    );
});
ListPageDropdownButton.displayName = 'ListPageDropdownButton';
