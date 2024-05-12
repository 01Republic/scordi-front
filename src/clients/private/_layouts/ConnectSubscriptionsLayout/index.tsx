import React, {memo} from 'react';
import {WithChildren} from '^types/global.type';
import {LeftAppsStatusPanel} from './LeftAppsStatusPanel';
import {BaseLayout} from '^clients/private/_layouts/BaseLayout';
import {GoogleLogin} from './GoogleLogin';

interface ConnectSubscriptionsLayoutProps extends WithChildren {
    //
}

export const ConnectSubscriptionsLayout = memo((props: ConnectSubscriptionsLayoutProps) => {
    const {children} = props;

    return (
        <BaseLayout>
            <GoogleLogin />
            <div className="w-full min-h-screen flex">
                {/* Side Panel */}
                <LeftAppsStatusPanel />

                {/* Content */}
                <main className="flex-grow bg-white relative">{children}</main>
            </div>
        </BaseLayout>
    );
});
ConnectSubscriptionsLayout.displayName = 'ConnectSubscriptionsLayout';
