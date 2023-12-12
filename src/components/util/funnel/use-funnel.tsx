import {RecoilState, useRecoilState} from 'recoil';
import {WithChildren} from '^types/global.type';
import {ReactComponentLike, ReactElementLike} from 'prop-types';

export function useFunnel<T = undefined>(recoilState: RecoilState<T>) {
    const [step, setStep] = useRecoilState(recoilState);

    const Step = ({name, children}: {name: T} & WithChildren) => {
        return <>{step === name ? children : ''}</>;
    };

    const LazyStep = ({name, render}: {name: T; render: () => ReactElementLike}) => {
        return <>{step === name ? render() : ''}</>;
    };

    return {setStep, Step, LazyStep};
}
