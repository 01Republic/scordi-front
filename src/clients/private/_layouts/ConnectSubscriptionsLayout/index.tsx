import {memo} from 'react';
import {WithChildren} from '^types/global.type';

interface ConnectSubscriptionsLayoutProps extends WithChildren {
    //
}

export const ConnectSubscriptionsLayout = memo((props: ConnectSubscriptionsLayoutProps) => {
    const {children} = props;

    return (
        <div className="w-full min-h-screen">
            {/* Body */}
            {children}
        </div>
    );
});
ConnectSubscriptionsLayout.displayName = 'ConnectSubscriptionsLayout';
