import React, {memo} from 'react';
import {InformationPanel} from './InformationPanel';
import {useCurrentSubscription} from '^v3/V3OrgAppShowPage/atom';
import {TabView} from './tabs/TabView';
import {ModalInfoSkeleton} from '^v3/share/Skeletons';

interface AppShowPageBodyProps {
    onFinish?: () => any;
}
export const AppShowPageBody = memo((props: AppShowPageBodyProps) => {
    const {isLoading} = useCurrentSubscription();
    const {onFinish} = props;

    return (
        <>
            {isLoading ? (
                <ModalInfoSkeleton />
            ) : (
                <>
                    <InformationPanel />
                    <TabView onDeleteMember={onFinish} />
                </>
            )}
        </>
    );
});
