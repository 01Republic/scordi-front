import {memo} from 'react';
import {WithChildren} from '^types/global.type';

interface SquircleProps extends WithChildren {
    text: string;
    onClick?: () => any;
    className?: string;
}

export const Squircle = memo((props: SquircleProps) => {
    const {text, className = '', children, onClick} = props;

    return (
        <div className={`squircle group ${className}`} tabIndex={0} onClick={() => onClick && onClick()}>
            <div className="relative">{children}</div>

            <div>
                <p>{text}</p>
            </div>
        </div>
    );
});
Squircle.displayName = 'Squircle';
