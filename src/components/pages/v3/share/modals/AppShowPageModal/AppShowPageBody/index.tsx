import React, {memo} from 'react';
import {InformationPanel} from './InformationPanel';
import {useCurrentSubscription} from '^v3/V3OrgAppShowPage/atom';
import {TabView} from './tabs/TabView';

export const AppShowPageBody = memo(() => {
    const {isLoading} = useCurrentSubscription();

    return (
        <>
            {isLoading ? (
                <p className="text-center">loading ...</p>
            ) : (
                <>
                    <InformationPanel />
                    <TabView />
                </>
            )}
        </>
    );
});
