import React, {memo} from 'react';
import {Loader} from 'lucide-react';

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
                <Loader size={size} />
            </div>
        </div>
    );
});
Spinner.displayName = 'Spinner';
