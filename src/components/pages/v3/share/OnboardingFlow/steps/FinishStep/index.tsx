import {memo} from 'react';
import {StepContentProps} from '^components/util/funnel';

interface Props extends StepContentProps {
    // onNext: () => any;
}

export const FinishStep = memo(function FinishStep(props: Props) {
    const {onNext} = props;
    return (
        <div data-step="Finish">
            <div>FinishStep</div>
            <button className="btn" onClick={() => onNext()}>
                Reset
            </button>
        </div>
    );
});
