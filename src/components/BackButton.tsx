import {ArrowLeft} from 'lucide-react';
import {useRouter} from 'next/router';

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
