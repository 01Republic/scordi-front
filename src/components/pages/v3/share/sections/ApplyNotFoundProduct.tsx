import {memo} from 'react';
import {FaAngleRight} from 'react-icons/fa6';
import {BiSolidHelpCircle} from 'react-icons/bi';

/**
 * 스코디에 등록되어있지 않은 앱 제보하기 버튼
 */
export const ApplyNotFoundProduct = memo(() => {
    return (
        <div className="btn btn-block btn-lg bg-white border border-gray-300">
            <div className="w-full h-full flex items-center">
                <BiSolidHelpCircle size={18} className="text-slate-500 mr-2.5" />
                <div className="flex-1 text-left">
                    <p className="text-xs">
                        <small className="block">등록되지 않는 앱이나 계정이 있나요?</small>
                        스코디에 제보하기
                    </p>
                </div>
                <FaAngleRight size={14} className="text-slate-500" />
            </div>
        </div>
    );
});
