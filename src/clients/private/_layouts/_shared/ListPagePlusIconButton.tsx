import React, {memo} from 'react';
import {Plus} from 'lucide-react';

interface ListPagePlusIconButtonProps {
    text: string;
    onClick: () => void;
}

export const ListPagePlusIconButton = memo((props: ListPagePlusIconButtonProps) => {
    const {text, onClick} = props;

    return (
        <button onClick={onClick} className="btn btn-scordi gap-2 mb-1 no-animation btn-animation">
            <Plus />
            <span className="mr-1.5">{text}</span>
        </button>
    );
});
