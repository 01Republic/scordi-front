import {DependencyList, useEffect} from 'react';
import {useRouter} from 'next/router';

export function useUnmount(callback: () => void, deps: DependencyList = []) {
    const router = useRouter();
    useEffect(() => callback, [router.isReady, ...deps]);
}
