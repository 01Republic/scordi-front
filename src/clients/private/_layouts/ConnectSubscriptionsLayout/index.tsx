import {memo} from 'react';
import {WithChildren} from '^types/global.type';
import {LeftAppsStatusPanel} from './LeftAppsStatusPanel';
import {BaseLayout} from '^clients/private/_layouts/BaseLayout';

interface ConnectSubscriptionsLayoutProps extends WithChildren {
    //
}

export const ConnectSubscriptionsLayout = memo((props: ConnectSubscriptionsLayoutProps) => {
    const {children} = props;

    return (
        <BaseLayout>
            <div className="w-full min-h-screen flex">
                {/* Side Panel */}
                <LeftAppsStatusPanel />

                {/* Content */}
                <main className="flex-grow bg-white">{children}</main>
            </div>
        </BaseLayout>
    );
});
ConnectSubscriptionsLayout.displayName = 'ConnectSubscriptionsLayout';
