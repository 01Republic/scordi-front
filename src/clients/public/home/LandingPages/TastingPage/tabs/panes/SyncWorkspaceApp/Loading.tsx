import {memo} from 'react';
import {Loader} from 'lucide-react';

export const Loading = memo(() => {
    return (
        <div className="text-center py-20">
            <Loader size={60} className="animate-spin text-scordi-500 mb-10 m-auto" />

            <div className="py-3 px-7 bg-scordi-100 text-scordi-600 rounded-lg text-lg font-semibold animate-pulse inline-block">
                구글 워크스페이스 계정을 연동중입니다. 잠시만 기다려주세요
            </div>
        </div>
    );
});
