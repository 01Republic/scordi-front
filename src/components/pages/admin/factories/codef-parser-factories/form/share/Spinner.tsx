import React, {memo} from 'react';
import {CgSpinner} from 'react-icons/cg';

interface SpinnerProps {
    size?: number;
}

export const Spinner = memo((props: SpinnerProps) => {
    const {size = 15} = props;

    return (
        <div className="flex items-center justify-center">
            <div className="animate-spin">
                <CgSpinner size={size} />
            </div>
        </div>
    );
});
Spinner.displayName = 'Spinner';
