import React, {memo} from 'react';
import {useRecoilValue} from 'recoil';
import {ScordiPlanDto} from '^models/_scordi/ScordiPlan/type';
import {useCurrentScordiSubscription} from '^models/_scordi/ScordiSubscription/hook';
import {scordiSubscriptionScheduledListAtom as scheduledListAtom} from '^models/_scordi/ScordiSubscription/atom';
import {scordiPlanDescriptionList} from '^models/_scordi/ScordiPlan/components/descriptionList';

interface ScordiPlanCardForFreeTrialProps {
    scordiPlan: ScordiPlanDto;
    onClick: () => any;
}

export const ScordiPlanCardForFreeTrial = memo((props: ScordiPlanCardForFreeTrialProps) => {
    const {scordiPlan, onClick} = props;
    const {currentSubscription} = useCurrentScordiSubscription();
    const scheduledSubscriptions = useRecoilValue(scheduledListAtom);
    const scheduledItem = scheduledSubscriptions.find((s) => {
        return s.scordiPlanId === scordiPlan.id; // || (s.scordiPlan.priority == 1 && plan.priority == 1);
    });
    const descriptions = scordiPlanDescriptionList[0];

    // 현재 플랜이 체험판인 상태
    const isCurrentPlan = scordiPlan.id === currentSubscription?.scordiPlanId;

    // 체험판 기간이 끝나서 만료된 상태
    const isExpiredPlan = (() => {
        if (!currentSubscription) return false; // 현재구독 자체가 조회되지 않으면 일단 활성 허용.
        if (!isCurrentPlan) return true; // 현재구독이 있는데, 체험판 플랜이 아닌 경우, 체험판은 만료된 상태로 본다.

        // 이제 현재구독이 존재하면서 동시에 체험판 플랜인 상태. (isCurrentPlan && currentSubscription)
        return currentSubscription.isFinished; // 만료체크
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
                <div className={'font-bold text-xl'}>14일 무료</div>
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
                    {!currentSubscription ? (
                        // 현재구독 자체가 조회되지 않으면 => 체험판 시작하기
                        <button className="btn bg-scordi-50 text-scordi w-full no-animation hover:bg-red-200 hover:text-red-600 border-none group">
                            시작하기
                        </button>
                    ) : isCurrentPlan && !isExpiredPlan ? (
                        // 현재 체험판 플랜 구독중이고 만료도 안됐다면 => 체험판 진행중
                        <button className="btn bg-scordi-50 text-scordi w-full no-animation no-click">현재플랜</button>
                    ) : (
                        // 그 외 => 체험판 만료
                        <button className="btn btn-block btn-gray no-animation !bg-[#e3e3e3] !text-white !border-transparent">
                            무료 체험기간이 만료되었어요
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
});
ScordiPlanCardForFreeTrial.displayName = 'ScordiPlanCardForFreeTrial';
