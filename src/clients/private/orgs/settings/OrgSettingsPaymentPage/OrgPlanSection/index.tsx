import {SelectPlanModal} from '^clients/private/_modals/SelectPlanModal';
import {useScordiPaymentsInSettingPage} from '^models/_scordi/ScordiPayment/hook';
import {useScordiPaymentMethodsInSettingPage} from '^models/_scordi/ScordiPaymentMethod/hook';
import {useCurrentScordiSubscription} from '^models/_scordi/ScordiSubscription/hook';
import {RotateCw} from 'lucide-react';
import {useTranslation} from 'next-i18next';
import {memo, useEffect, useState} from 'react';
import {SettingsPaymentSection} from '../SettingsPaymentSection';
import {OrgScheduledSubscriptionList} from './OrgScheduledSubscriptionList';
import {OrgScordiSubscriptionItem} from './OrgScordiSubscriptionItem';

interface OrgPlanSectionProps {
    orgId: number;
}

export const OrgPlanSection = memo((props: OrgPlanSectionProps) => {
    const {orgId} = props;
    const {t} = useTranslation('workspaceSettings');
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
                        <div>{t('payment.currentPlanInfo')}</div>
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
                buttonText={t('payment.planChange') || ''}
                buttonOnClick={() => setIsSelectPlanModalOpened(true)}
                isLoading={isLoading}
            >
                {!currentSubscription && isLoading && (
                    <div className="p-4 text-14 invisible">
                        <div>{t('payment.loading')}</div>
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
