import {RecoilState, useRecoilState} from 'recoil';
import {WithChildren} from '^types/global.type';

export function useFunnel<T = undefined>(recoilState: RecoilState<T>) {
    const [step, setStep] = useRecoilState(recoilState);

    const Step = ({name, children}: {name: T} & WithChildren) => {
        return <>{step === name ? children : ''}</>;
    };

    return {setStep, Step};
}
