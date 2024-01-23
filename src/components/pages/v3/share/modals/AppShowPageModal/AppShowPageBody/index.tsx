import React, {memo} from 'react';
import {InformationPanel} from './InformationPanel';
import {useCurrentSubscription} from '^v3/V3OrgAppShowPage/atom';
import {TabView} from './tabs/TabView';
import {ModalInfoSkeleton} from '^v3/share/Skeletons';

export const AppShowPageBody = memo(() => {
    const {isLoading} = useCurrentSubscription();

    return (
        <>
            {isLoading ? (
                <ModalInfoSkeleton />
            ) : (
                <>
                    <InformationPanel />
                    <TabView />
                </>
            )}
        </>
    );
});
