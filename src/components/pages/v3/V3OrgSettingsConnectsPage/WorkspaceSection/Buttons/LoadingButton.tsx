import React, {memo} from 'react';
import {CgSpinner} from 'react-icons/cg';

interface LoadingButtonProps {
    text: string;
}

export const LoadingButton = memo((props: LoadingButtonProps) => {
    const {text} = props;

    return (
        <div className="!w-auto gap-2 flex items-center opacity-50 p-3 text-gray-500 text-sm cursor-default">
            <CgSpinner size={20} className="animate-spin" />
            {text}
        </div>
    );
});
