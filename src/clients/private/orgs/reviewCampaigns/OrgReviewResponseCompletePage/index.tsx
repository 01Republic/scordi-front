import {Check} from 'lucide-react';

export const ReviewResponseCompletePage = () => {
    return (
        <div
            className={
                'space-y-2 min-h-lvh max-w-screen-sm mx-auto py-20 flex flex-col items-center justify-center bg-gray-50'
            }
        >
            <div
                className={
                    'flex items-center justify-center gap-2 text-white w-14 h-14 bg-scordi rounded-full text-24 mb-3'
                }
            >
                <Check />
            </div>
            <div className={'text-24 font-medium text-gray-800'}>응답이 정상적으로 제출되었어요!</div>
        </div>
    );
};
