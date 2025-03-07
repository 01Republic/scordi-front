import React, {memo} from 'react';
import {Loader} from 'lucide-react';

interface LoadingButtonProps {
    text: string;
}

export const LoadingButton = memo((props: LoadingButtonProps) => {
    const {text} = props;

    return (
        <div className="!w-auto gap-2 flex items-center opacity-50 p-3 text-gray-500 text-sm cursor-default">
            <Loader size={20} className="animate-spin" />
            {text}
        </div>
    );
});
