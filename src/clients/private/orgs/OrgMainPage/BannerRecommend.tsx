import React, {memo} from 'react';
import {toast} from 'react-hot-toast';

export const BannerRecommend = memo(() => {
    const copyScordiLink = () => {
        const url = 'https://scordi.io';
        navigator.clipboard.writeText(url).then(() => {
            toast.success('스코디 주소가 클립보드에 복사되었습니다. \n대화창에 붙여넣기 해주세요!');
        });
    };

    return (
        <div className=" w-96 h-48  flex flex-col bg-gradient-to-r from-[#E4B1D2] to-[#759DE5] rounded-[10px]">
            <div className="px-[41px] pt-[35px]">
                <span className=" font-bold text-white text-[24px] flex flex-col">
                    지인에게 스코디를
                    <br /> 추천해주세요.
                </span>
                <button
                    className="w-48 h-10 bg-black flex items-center justify-center mt-2.5 rounded-[10px] hover:bg-white group"
                    onClick={copyScordiLink}
                >
                    <span className="font-semibold text-sm text-white group-hover:text-black">
                        다른 회사에 알려주기
                    </span>
                </button>
            </div>
        </div>
    );
});
BannerRecommend.displayName = 'BannerRecommend';
