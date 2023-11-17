import {RecoilState, useRecoilValue} from 'recoil';
import {currentOrgAtom} from '^models/Organization/atom';

export function useSafePath<T>(atom: RecoilState<T>) {
    const value = useRecoilValue(atom);
    return {safePath: (path: (v: NonNullable<T>) => string) => (value ? path(value) : '#')};
}

export const useSafePathInCurrentOrg = () => useSafePath(currentOrgAtom);
