import {atom, RecoilState, useRecoilState} from 'recoil';

export const useIsLoading = (atom: RecoilState<boolean>) => {
    const [isLoading, setIsLoading] = useRecoilState(atom);

    const loadingScope = <T>(request: () => Promise<T>) => {
        setIsLoading(true);
        return request().finally(() => setIsLoading(false));
    };

    return {
        isLoading,
        setIsLoading,
        loadingScope,
    };
};

export const makeIsLoadingAtom = (key: string) => atom({key, default: false});
