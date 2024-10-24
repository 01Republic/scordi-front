import React, {memo} from 'react';

export const BannerRecommend = memo(() => {
    return (
        <div className=" w-96 h-48  flex flex-col bg-gradient-to-r from-[#E4B1D2] to-[#759DE5] rounded-[10px]">
            <div className="px-[41px] pt-[35px]">
                <span className=" font-bold text-white text-[24px] flex flex-col">
                    지인에게 스코디를
                    <br /> 추천해주세요.
                </span>
                <button className="w-48 h-10 bg-black flex items-center justify-center mt-2.5 rounded-[10px] hover:bg-white group">
                    <span className="font-semibold text-sm text-white group-hover:text-black">소개하고 할인 받기</span>
                </button>
            </div>
        </div>
    );
});
BannerRecommend.displayName = 'BannerRecommend';
