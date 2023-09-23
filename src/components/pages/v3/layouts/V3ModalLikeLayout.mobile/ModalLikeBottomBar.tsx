import {CSSProperties, memo} from 'react';
import {WithChildren} from '^types/global.type';

interface ModalLikeBottomBarProps extends WithChildren {
    className?: string;
    style?: CSSProperties;
}

export const ModalLikeBottomBar = memo((props: ModalLikeBottomBarProps) => {
    const {className = '', style, children} = props;

    return (
        <div className={`fixed bottom-0 w-full flex justify-evenly gap-3 px-5 py-5 ${className}`} style={style}>
            {children}
        </div>
    );
});
