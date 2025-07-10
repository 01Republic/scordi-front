import {usePlanDescriptions} from '^models/_scordi/ScordiPlan/components/descriptionList';
import {ScordiPlanDto} from '^models/_scordi/ScordiPlan/type';
import {ScordiSubscriptionDto} from '^models/_scordi/ScordiSubscription/type';
import {useTranslation} from 'next-i18next';
import {memo} from 'react';

interface ScordiPlanCardForFreeTrialProps {
    scordiSubscriptions: ScordiSubscriptionDto[];
    scordiPlan: ScordiPlanDto;
    onClick: () => any;
}

export const ScordiPlanCardForFreeTrial = memo((props: ScordiPlanCardForFreeTrialProps) => {
    const {scordiPlan, scordiSubscriptions, onClick} = props;
    const {t} = useTranslation('workspaceSettings');
    const planDescriptions = usePlanDescriptions();
    const descriptions = planDescriptions[0];

    // 조직의 구독이력 중 무료체험판 구독이 포함되어 있다면, 찾아서 반환
    const freeTrialScordiSubscription = scordiSubscriptions.find((s) => s.scordiPlan.isFreeTrial);

    const isCurrentPlan = scordiPlan.id === freeTrialScordiSubscription?.scordiPlanId;

    // 체험판 기간이 끝나서 만료된 상태 (이 값이 참이면 무료 체험판 플랜 선택 불가)
    const isExpiredPlan = (() => {
        // 조직의 구독이력 자체가 조회되지 않으면 일단 만료 안된걸로 간주합니다.
        if (!scordiSubscriptions) return false;

        // 조직의 구독 이력 중 무료체험판 구독이 없거나, 정상적인 무료 체험판 플랜 레코드가 아니라면 만료 된걸로 간주합니다.
        if (!freeTrialScordiSubscription || !isCurrentPlan) return true;

        return freeTrialScordiSubscription.isFinished;
    })();

    return (
        <div
            className={`flex-1 border rounded-xl p-4 space-y-4 flex flex-col hover:border-scordi transition cursor-pointer ${
                isExpiredPlan ? 'text-[#b3b3b3] pointer-events-none' : ''
            } ${isCurrentPlan ? 'border-scordi' : ''}`}
            onClick={isCurrentPlan ? undefined : onClick}
        >
            <div className="min-h-[7rem] flex flex-col justify-between border-b pb-4">
                <div className="flex justify-between items-start">
                    <div>{scordiPlan.name}</div>
                </div>
                <div className={'font-bold text-xl'}>{t('planCard.freeForOneMonth')}</div>
            </div>

            <div className="flex flex-col justify-between flex-grow">
                <div className="space-y-2 flex-grow mb-8">
                    {descriptions.map((desc, i) => (
                        <div key={i} className={'flex items-center space-x-2 text-sm'}>
                            {desc}
                        </div>
                    ))}
                </div>

                <div>
                    {!scordiSubscriptions ? (
                        // 조직의 구독이력 자체가 조회되지 않으면 => 무료체험판 시작하기
                        <button className="btn bg-scordi-50 text-scordi w-full no-animation hover:bg-red-200 hover:text-red-600 border-none group">
                            {t('planCard.startNow')}
                        </button>
                    ) : isCurrentPlan && !isExpiredPlan ? (
                        // 현재 무료체험판 플랜 구독중이고 만료도 안됐다면 => 무료체험판 진행중
                        <button className="btn bg-scordi-50 text-scordi w-full no-animation no-click">
                            {t('planCard.currentPlan')}
                        </button>
                    ) : (
                        // 그 외 => 무료체험판 만료
                        <button className="btn btn-block btn-gray no-animation !bg-[#e3e3e3] !text-white !border-transparent">
                            {t('planCard.trialPeriodExpired')}
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
});
ScordiPlanCardForFreeTrial.displayName = 'ScordiPlanCardForFreeTrial';
