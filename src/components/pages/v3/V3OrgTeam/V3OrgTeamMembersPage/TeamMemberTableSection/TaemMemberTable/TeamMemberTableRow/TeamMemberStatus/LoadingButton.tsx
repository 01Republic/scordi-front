import React, {memo} from 'react';
import {CgSpinner} from 'react-icons/cg';

interface LoadingButtonProps {
    text: string;
}

export const LoadingButton = memo((props: LoadingButtonProps) => {
    const {text} = props;

    return (
        <button className="btn-disabled opacity-40 btn btn-sm btn-scordi btn-outline normal-case gap-2">
            <CgSpinner className="animate-spin" />
            {text}
        </button>
    );
});
