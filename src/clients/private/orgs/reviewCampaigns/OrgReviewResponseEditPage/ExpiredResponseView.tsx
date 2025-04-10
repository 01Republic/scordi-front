import {TriangleAlert} from 'lucide-react';

export const ExpiredResponseView = () => {
    return (
        <div className="space-y-2 min-h-lvh max-w-screen-sm mx-auto py-20 flex flex-col items-center justify-center bg-gray-50">
            <div className="flex items-center justify-center gap-2 text-white w-14 h-14 bg-[#FB923C] rounded-full text-24 mb-3">
                <TriangleAlert />
            </div>
            <div className="text-24 font-medium text-gray-800">응답 기간이 종료되었어요.</div>
            <div className="text-18 text-gray-800">추가 문의 사항이 있으시면, 관리자에게 문의해 주세요.</div>
        </div>
    );
};
