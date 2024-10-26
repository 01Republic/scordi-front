import React, {memo, useEffect, useState} from 'react';
import {MdRefresh} from 'react-icons/md';
import {useCurrentScordiSubscription} from '^models/_scordi/ScordiSubscription/hook';
import {SettingsPaymentSection} from './SettingsPaymentSection';
import {SelectPlanModal} from './SelectPlanModal';
import {OrgScordiSubscriptionItem} from './OrgPlanSection/OrgScordiSubscriptionItem';
import {OrgScheduledSubscriptionList} from './OrgPlanSection/OrgScheduledSubscriptionList';

interface OrgPlanSectionProps {
    orgId: number;
}

export const OrgPlanSection = memo((props: OrgPlanSectionProps) => {
    const {orgId} = props;
    const {isLoading, currentSubscription, fetch: fetchCurrentSubscription, reload} = useCurrentScordiSubscription();
    // const {result, fetch: fetchScheduledSubscriptions} = useScheduledScordiSubscriptions();
    const [isSelectPlanModalOpened, setIsSelectPlanModalOpened] = useState(false);

    useEffect(() => {
        if (!orgId || isNaN(orgId)) return;

        fetchCurrentSubscription(orgId);
        // fetchScheduledSubscriptions(orgId);
    }, [orgId]);

    return (
        <>
            <SettingsPaymentSection
                title={
                    <div className="flex items-center gap-2">
                        <div>현재 플랜 정보</div>
                        <div>
                            <MdRefresh
                                fontSize={14}
                                className={`cursor-pointer ${isLoading ? 'animate-spin' : ''}`}
                                onClick={() => reload()}
                            />
                        </div>
                    </div>
                }
                buttonText="플랜 변경"
                buttonOnClick={() => setIsSelectPlanModalOpened(true)}
                isLoading={isLoading}
            >
                {currentSubscription && <OrgScordiSubscriptionItem scordiSubscription={currentSubscription} />}
                {currentSubscription && <OrgScheduledSubscriptionList orgId={orgId} />}
            </SettingsPaymentSection>
            <SelectPlanModal
                orgId={orgId}
                isOpened={isSelectPlanModalOpened}
                onClose={() => setIsSelectPlanModalOpened(false)}
            />
        </>
    );
});
OrgPlanSection.displayName = 'OrgPlanSection';
