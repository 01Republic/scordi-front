import React, {memo} from 'react';

export const BannerFeedback = memo(() => {
    return (
        <div className=" w-96 h-48  flex flex-col bg-gradient-to-r from-[#2498CB] to-[#6517CD] rounded-[10px]">
            <div className="px-[41px] pt-[35px]">
                <span className=" font-bold text-white text-[24px] flex flex-col">
                    스코디 서비스에 대한 <br /> 피드백을 전해주세요
                </span>
                <button className="w-48 h-10 bg-black flex items-center justify-center mt-2.5 rounded-[10px] hover:bg-white group">
                    <span className="font-semibold text-sm text-white group-hover:text-black">개선사항 투표하기</span>
                </button>
            </div>
        </div>
    );
});
BannerFeedback.displayName = 'BannerFeedback';