import React, {memo} from 'react';
import {WithChildren} from '^types/global.type';

interface CheckCircleProps {
    className?: string;
    color?: string;
}

export const CheckCircle = memo((props: CheckCircleProps) => {
    const {className = '', color = '#81c038'} = props;

    return (
        <div className={`check-circle-container ${className}`}>
            <svg xmlns="http://www.w3.org/2000/svg" className="svg-success" viewBox="0 0 24 24">
                <g stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10">
                    <circle className="success-circle-outline" cx="12" cy="12" r="11.5" stroke={color} />
                    <circle className="success-circle-fill" cx="12" cy="12" r="11.5" fill={color} />
                    <polyline className="success-tick" points="17,8.5 9.5,15.5 7,13" />
                </g>
            </svg>
        </div>
    );
});
