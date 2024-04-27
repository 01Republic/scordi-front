import {memo} from 'react';
import {IoIosMore} from 'react-icons/io';
import {WithChildren} from '^types/global.type';

interface SquircleProps extends WithChildren {
    text: string;
    onClick?: () => any;
}

export const Squircle = memo((props: SquircleProps) => {
    const {text, children, onClick} = props;

    return (
        <div className="squircle group" tabIndex={0} onClick={() => onClick && onClick()}>
            <div className="">{children}</div>

            <div>
                <p>{text}</p>
            </div>
        </div>
    );
});
Squircle.displayName = 'Squircle';
