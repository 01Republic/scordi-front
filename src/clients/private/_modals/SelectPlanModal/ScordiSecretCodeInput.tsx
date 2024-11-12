import {memo, useRef} from 'react';
import {debounce} from 'lodash';
import {toast} from 'react-hot-toast';
import {useScordiPlanList} from '^models/_scordi/ScordiPlan/hook';

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
        }).then((plans = []) => {
            if (secretCode) {
                plans.find((plan) => plan.secretCode)
                    ? toast.success('쿠폰코드가 적용 되었습니다!')
                    : toast.error('쿠폰코드를 다시 확인해주세요 :(');
            }
        });
    }, 500);

    return (
        <div className="flex items-center gap-4">
            <div className="flex items-center gap-0.5" />
            <div>
                <form
                    className="relative"
                    onSubmit={(e) => {
                        e.stopPropagation();
                        e.preventDefault();
                        if (!inputRef.current) return;
                        onSubmit(inputRef.current.value);
                    }}
                >
                    <input
                        ref={inputRef}
                        className="input input-bordered input-sm pr-14"
                        placeholder="쿠폰코드를 입력해주세요."
                    />
                    <button className="btn btn-xs btn-scordi absolute top-0 bottom-0 my-auto right-1.5">확인</button>
                </form>
            </div>
        </div>
    );
});
ScordiSecretCodeInput.displayName = 'ScordiSecretCodeInput';
