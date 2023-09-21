import React, {memo} from 'react';

interface AddButtonProps {
    title: string;
    onClick: () => any;
}

export const AddButton = memo((props: AddButtonProps) => {
    const {title, onClick} = props;

    return (
        <a
            onClick={onClick}
            className="w-full py-4 -mb-4 cursor-pointer flex items-center justify-center text-xs text-gray-500 hover:text-gray-900"
        >
            {title}
        </a>
    );
});
