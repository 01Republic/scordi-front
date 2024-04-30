import {memo} from 'react';
import {WithChildren} from '^types/global.type';

interface BaseLayoutProps extends WithChildren {
    //
}

export const BaseLayout = memo((props: BaseLayoutProps) => {
    const {children} = props;

    return <>{children}</>;
});
BaseLayout.displayName = 'BaseLayout';
