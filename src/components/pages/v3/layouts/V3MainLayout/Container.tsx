import {WithChildren} from '^types/global.type';
import {memo} from 'react';

interface V3MainLayoutContainerProps extends WithChildren {
    className?: string;
}

export const V3MainLayoutContainer = memo((props: V3MainLayoutContainerProps) => {
    const {className = '', children} = props;

    // return <div className={`py-[72px] max-w-[62.3%] mx-auto ${className}`}>{children}</div>;
    return <main className={`container max-w-screen-xl py-10 px-12 ${className}`}>{children}</main>;
});
