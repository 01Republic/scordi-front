import {memo} from 'react';
import {WithChildren} from '^types/global.type';

interface ModalLikeBottomBarProps extends WithChildren {}

export const ModalLikeBottomBar = memo((props: ModalLikeBottomBarProps) => {
    const {children} = props;

    return <div className="fixed bottom-0 w-full flex justify-evenly gap-3 px-5 py-5">{children}</div>;
});
