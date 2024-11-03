import {memo, useRef} from 'react';
import {useScordiPlanList} from '^models/_scordi/ScordiPlan/hook';
import {HiMiniInformationCircle} from 'react-icons/hi2';
import {debounce} from 'lodash';

interface ScordiSecretCodeInputProps {
    //
}

export const ScordiSecretCodeInput = memo((props: ScordiSecretCodeInputProps) => {
    const {fetch: fetchPlans, currentStepType: stepType} = useScordiPlanList();
    const inputRef = useRef<HTMLInputElement>(null);

    const onSubmit = debounce((secretCode: string) => {
        fetchPlans({
            where: {isPublic: true, stepType},
            secretCode,
            order: {priority: 'ASC', isPublic: 'ASC'},
        });
    }, 500);

    return (
        <div className="flex items-center gap-4">
            <div className="flex items-center gap-0.5">
                {/*<div>*/}
                {/*    <HiMiniInformationCircle fontSize={16} className="relative top-[-0.5px] text-gray-400" />*/}
                {/*</div>*/}
                <div className="text-14 text-gray-500">쿠폰코드 :</div>
            </div>
            <div>
                <form
                    onSubmit={(e) => {
                        e.stopPropagation();
                        e.preventDefault();
                        if (!inputRef.current) return;
                        onSubmit(inputRef.current.value);
                    }}
                >
                    <input
                        ref={inputRef}
                        className="input input-bordered input-sm"
                        onChange={(e) => {
                            onSubmit(e.target.value);
                        }}
                    />
                </form>
            </div>
        </div>
    );
});
ScordiSecretCodeInput.displayName = 'ScordiSecretCodeInput';
