import {memo} from 'react';

export const ProductPostListHeader = memo(() => {
    return (
        <div className="blog-container blog-container--default pt-[80px]">
            <div className="blog-container--inner">
                <h3 className="text-left font-[600] text-gray-800 leading-[1.4] text-[28px] sm:text-[52px]">
                    SaaS Collection
                </h3>
                <p
                    className="hidden text-center font-[500] text-gray-500 pt-[12px] sm:pt-[16px] text-[15px] sm:text-[20px] leading-[1.4] sm:leading-[1.2]"
                    style={{wordBreak: 'keep-all'}}
                >
                    모든 SaaS를 스코디에서 모으고 관리하세요.
                </p>
            </div>
        </div>
    );
});
