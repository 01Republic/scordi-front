import {useRouter} from 'next/router';
import {useEffect, useState} from 'react';
import {UserLocale} from '^models/User/types/UserLocale.enum';

export const useCurrentLocale = () => {
    const router = useRouter();
    const [currentLocale, setCurrentLocale] = useState<UserLocale>(UserLocale.Ko);

    useEffect(() => {
        const locale = router.locale as UserLocale;
        if (!locale) return;
        setCurrentLocale(locale);
    }, [router.locale]);

    return {currentLocale, setCurrentLocale};
};
