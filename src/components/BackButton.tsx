import {LinkTo} from '^components/util/LinkTo';
import {ArrowLeft} from 'lucide-react';
import {useTranslation} from 'next-i18next';
import {useRouter} from 'next/router';

export const BackButton = () => {
    const router = useRouter();
    const {t} = useTranslation('common');

    return (
        <div
            className="flex items-center gap-2 hover:cursor-pointer hover:text-scordi-500"
            onClick={() => router.back()}
        >
            <ArrowLeft className="w-6 h-6" />
            {t('button.back')}
        </div>
    );
};

export const BackButton2 = () => {
    const router = useRouter();
    const {t} = useTranslation('common');

    return (
        <LinkTo
            className="flex gap-1 items-center text-14 cursor-pointer text-gray-600 transition-all hover:text-gray-800 hover:font-semibold"
            onClick={() => router.back()}
            displayLoading={false}
        >
            <ArrowLeft />
            {t('button.back')}
        </LinkTo>
    );
};
