import React, {memo, useEffect, useState} from 'react';
import {useCurrentScordiSubscription} from '^models/_scordi/ScordiSubscription/hook';
import {SelectPlanModal} from '^clients/private/_modals/SelectPlanModal';
import {SettingsPaymentSection} from '../SettingsPaymentSection';
import {OrgScordiSubscriptionItem} from './OrgScordiSubscriptionItem';
import {OrgScheduledSubscriptionList} from './OrgScheduledSubscriptionList';
import {useScordiPaymentMethodsInSettingPage} from '^models/_scordi/ScordiPaymentMethod/hook';
import {useScordiPaymentsInSettingPage} from '^models/_scordi/ScordiPayment/hook';
import {RotateCw} from 'lucide-react';

interface OrgPlanSectionProps {
    orgId: number;
}

export const OrgPlanSection = memo((props: OrgPlanSectionProps) => {
    const {orgId} = props;
    const {isLoading, currentSubscription, fetch: fetchCurrentSubscription, reload} = useCurrentScordiSubscription();
    // const {result, fetch: fetchScheduledSubscriptions} = useScheduledScordiSubscriptions();
    const [isSelectPlanModalOpened, setIsSelectPlanModalOpened] = useState(false);

    const {reload: reloadPaymentMethods} = useScordiPaymentMethodsInSettingPage();
    const {reload: reloadPaymentHistories} = useScordiPaymentsInSettingPage();

    useEffect(() => {
        if (!orgId || isNaN(orgId)) return;

        fetchCurrentSubscription(orgId);
        // fetchScheduledSubscriptions(orgId);
    }, [orgId]);

    const reloadResources = async () => {
        reloadPaymentMethods();
        reloadPaymentHistories();
    };

    return (
        <>
            <SettingsPaymentSection
                title={
                    <div className="flex items-center gap-2">
                        <div>현재 플랜 정보</div>
                        <div>
                            <RotateCw
                                fontSize={14}
                                className={`cursor-pointer ${isLoading ? 'animate-spin' : ''}`}
                                onClick={() => reload(orgId)}
                            />
                        </div>
                    </div>
                }
                titleNoMargin={!currentSubscription}
                buttonText="플랜 변경"
                buttonOnClick={() => setIsSelectPlanModalOpened(true)}
                isLoading={isLoading}
            >
                {!currentSubscription && isLoading && (
                    <div className="p-4 text-14 invisible">
                        <div>Loading</div>
                    </div>
                )}
                {currentSubscription && (
                    <OrgScordiSubscriptionItem scordiSubscription={currentSubscription} reload={() => reload(orgId)} />
                )}
                {currentSubscription && <OrgScheduledSubscriptionList orgId={orgId} />}
            </SettingsPaymentSection>

            <SelectPlanModal
                orgId={orgId}
                isOpened={isSelectPlanModalOpened}
                onClose={() => setIsSelectPlanModalOpened(false)}
                onSuccess={() => reloadResources()}
            />
        </>
    );
});
OrgPlanSection.displayName = 'OrgPlanSection';
