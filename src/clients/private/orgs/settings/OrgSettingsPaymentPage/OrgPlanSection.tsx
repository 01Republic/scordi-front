import React, {memo, useEffect, useState} from 'react';
import {SettingsPaymentSection} from './SettingsPaymentSection';
import {SelectPlanModal} from './SelectPlanModal';
import {useCurrentScordiSubscription} from '^models/_scordi/ScordiSubscription/hook';
import {yyyy_mm_dd} from '^utils/dateTime';

interface OrgPlanSectionProps {
    orgId: number;
}

export const OrgPlanSection = memo((props: OrgPlanSectionProps) => {
    const {orgId} = props;
    const {isLoading, currentSubscription, fetch} = useCurrentScordiSubscription();
    const [isSelectPlanModalOpened, setIsSelectPlanModalOpened] = useState(false);

    useEffect(() => {
        if (orgId && !isNaN(orgId)) fetch(orgId);
    }, [orgId]);

    return (
        <>
            <SettingsPaymentSection
                title="현재 플랜 정보"
                buttonText="플랜 변경"
                buttonOnClick={() => setIsSelectPlanModalOpened(true)}
                isLoading={isLoading}
            >
                {currentSubscription && (
                    <div className={'p-4 bg-gray-50 flex justify-between items-center'}>
                        <div>{currentSubscription.scordiPlan.name}</div>
                        <div>
                            이용기간:{' '}
                            {currentSubscription.startAt && currentSubscription.finishAt ? (
                                <span>
                                    {yyyy_mm_dd(currentSubscription.startAt)} ~{' '}
                                    {yyyy_mm_dd(currentSubscription.finishAt)}
                                </span>
                            ) : (
                                ''
                            )}
                        </div>
                    </div>
                )}
            </SettingsPaymentSection>
            <SelectPlanModal isOpened={isSelectPlanModalOpened} onClose={() => setIsSelectPlanModalOpened(false)} />
        </>
    );
});
OrgPlanSection.displayName = 'OrgPlanSection';
