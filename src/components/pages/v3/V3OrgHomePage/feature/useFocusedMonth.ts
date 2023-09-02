import {atom, useRecoilState} from 'recoil';
import {useRouter} from 'next/router';
import {useEffect} from 'react';
import {monthAfter, yyyy_mm_dd} from '^utils/dateTime';

export const focusedMonthAtom = atom<Date | null>({
    key: 'focusedMonthAtom',
    default: null,
});

interface UseFocusedMonth {
    cached?: boolean;
    minDate?: Date;
    maxDate?: Date;
    minUnavailableMsg?: string;
    maxUnavailableMsg?: string;
}

export const useFocusedMonth = (props?: UseFocusedMonth) => {
    const {cached = true, minDate, maxDate, minUnavailableMsg = '', maxUnavailableMsg = ''} = props || {};
    const router = useRouter();
    const [focusedMonth, setFocusedMonth] = useRecoilState(focusedMonthAtom);

    useEffect(() => {
        if (cached) return;
        if (!router.isReady) return;
        const d = router.query.d as string | undefined;
        setFocusedMonth(d ? new Date(d) : new Date());
    }, [router.isReady]);

    const moveMonth = async (n: number) => {
        const oldDate = focusedMonth || new Date();
        const newDate = monthAfter(n, oldDate);
        setFocusedMonth(newDate);
        router.query.d = yyyy_mm_dd(newDate);
        await router.replace(router);
    };
    const prevMonth = () => prevAvailable(-1, false) && moveMonth(-1);
    const nextMonth = () => nextAvailable(1, false) && moveMonth(1);

    const prevAvailable = (n: number = -1, silent: boolean = true) => {
        const oldDate = focusedMonth || new Date();
        const newDate = monthAfter(n, oldDate);
        const fine = minDate ? minDate <= newDate : true;
        if (fine) return true;
        !silent && minUnavailableMsg && alert(minUnavailableMsg);
        return false;
    };
    const nextAvailable = (n: number = 1, silent: boolean = true) => {
        const oldDate = focusedMonth || new Date();
        const newDate = monthAfter(n, oldDate);
        const fine = maxDate ? newDate <= maxDate : true;
        if (fine) return true;
        !silent && maxUnavailableMsg && alert(maxUnavailableMsg);
        return false;
    };

    return {
        focusedMonth,
        setFocusedMonth,
        moveMonth,
        prevMonth,
        nextMonth,
        prevAvailable,
        nextAvailable,
    };
};
