import {RecoilState, useRecoilState} from 'recoil';
import {ReactNodeElement, WithChildren} from '^types/global.type';

export function useFunnel<T = undefined>(recoilState: RecoilState<T>) {
    const [step, setStep] = useRecoilState(recoilState);

    const Step = ({name, children}: {name: T} & WithChildren) => {
        return <>{step === name ? children : ''}</>;
    };

    const LazyStep = ({name, render}: {name: T; render: () => ReactNodeElement}) => {
        return <>{step === name ? render() : ''}</>;
    };

    return {setStep, Step, step, LazyStep};
}
