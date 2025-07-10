import {ArrowLeft} from 'lucide-react';
import {useRouter} from 'next/router';
import {LinkTo} from '^components/util/LinkTo';

export const BackButton = () => {
    const router = useRouter();

    return (
        <div
            className="flex items-center gap-2 hover:cursor-pointer hover:text-scordi-500"
            onClick={() => router.back()}
        >
            <ArrowLeft className="w-6 h-6" />
            뒤로가기
        </div>
    );
};

export const BackButton2 = () => {
    const router = useRouter();

    return (
        <LinkTo
            className="flex gap-1 items-center text-14 cursor-pointer text-gray-600 transition-all hover:text-gray-800 hover:font-semibold"
            onClick={() => router.back()}
            displayLoading={false}
        >
            <ArrowLeft />
            뒤로가기
        </LinkTo>
    );
};
