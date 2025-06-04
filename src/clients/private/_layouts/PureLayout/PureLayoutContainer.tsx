import {memo} from 'react';
import {WithChildren} from '^types/global.type';
import {cn} from '^public/lib/utils';

interface PureLayoutContainerProps extends WithChildren {
    className?: string;
}

export const PureLayoutContainer = memo((props: PureLayoutContainerProps) => {
    const {className = '', children} = props;

    return (
        <div
            data-component="PureLayoutContainer"
            className={cn('mx-auto max-w-6xl min-h-screen px-4 py-14', className)}
        >
            {children}
        </div>
    );
});
PureLayoutContainer.displayName = 'PureLayoutContainer';
