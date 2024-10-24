import React, {memo, useEffect, useState} from 'react';
import {SettingsPaymentSection} from './SettingsPaymentSection';
import {SelectPlanModal} from './SelectPlanModal';
import {useCurrentScordiSubscription} from '^models/_scordi/ScordiSubscription/hook';
import {yyyy_mm_dd} from '^utils/dateTime';
import {MdRefresh} from 'react-icons/md';
import {t_planStepType} from '^models/_scordi/ScordiPlan/type';

interface OrgPlanSectionProps {
    orgId: number;
}

export const OrgPlanSection = memo((props: OrgPlanSectionProps) => {
    const {orgId} = props;
    const {isLoading, currentSubscription, fetch, reload} = useCurrentScordiSubscription();
    const [isSelectPlanModalOpened, setIsSelectPlanModalOpened] = useState(false);

    useEffect(() => {
        if (orgId && !isNaN(orgId)) fetch(orgId);
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
                {currentSubscription && (
                    <div className={'p-4 bg-slate-50 flex items-center justify-between rounded-lg text-14'}>
                        <div className="flex items-center gap-2">
                            <div className="font-semibold">{currentSubscription.scordiPlan.name}</div>
                            <div className="font-semibold text-gray-500">
                                {currentSubscription.scordiPlan.price === 0 ? (
                                    <span>
                                        (무료 {currentSubscription.scordiPlan.regularPrice > 0 ? '(할인됨)' : ''})
                                    </span>
                                ) : (
                                    <span>({t_planStepType(currentSubscription.scordiPlan.stepType)} 정기구독)</span>
                                )}
                            </div>
                        </div>

                        <div className="flex items-center gap-6">
                            <div className="flex items-center gap-1.5">
                                <span className="text-gray-500">다음 결제일 :</span>
                                <span>
                                    {currentSubscription.getNextDate()
                                        ? yyyy_mm_dd(currentSubscription.getNextDate()!, '. ')
                                        : '-'}
                                </span>
                            </div>

                            {currentSubscription.startAt && currentSubscription.finishAt ? (
                                <div className="flex items-center gap-1.5">
                                    <span className="text-gray-500">이용기간 :</span>
                                    <span>
                                        {yyyy_mm_dd(currentSubscription.startAt, '. ')} ~{' '}
                                        {yyyy_mm_dd(currentSubscription.finishAt, '. ')}
                                    </span>
                                </div>
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
