import React, {memo} from 'react';
import {CgSpinner} from 'react-icons/cg';

interface SpinnerProps {
    size?: number;
    posY?: 'top' | 'center' | 'bottom';
    posX?: 'left' | 'center' | 'right';
}

export const Spinner = memo((props: SpinnerProps) => {
    const {size = 15, posY = 'center', posX = 'center'} = props;

    return (
        <div className={`flex items-${posY} justify-${posX} h-full`}>
            <div className="animate-spin">
                <CgSpinner size={size} />
            </div>
        </div>
    );
});
Spinner.displayName = 'Spinner';
