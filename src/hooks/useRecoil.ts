import {RecoilState, useRecoilState, useResetRecoilState} from 'recoil';

export function useRecoilStates<T>(atom: RecoilState<T>) {
    const [value, setValue] = useRecoilState(atom);
    const resetValue = useResetRecoilState(atom);
    return {
        value,
        setValue,
        resetValue,
    };
}
