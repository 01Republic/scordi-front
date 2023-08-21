import {memo} from 'react';

export const ProductPostListHeader = memo(() => {
    return (
        <div className="blog-container blog-container--default py-[80px]">
            <h1 className="font-[600] text-gray-800 leading-[1.4] text-[28px] sm:text-[52px]">SaaS Collection</h1>
            <p
                className="font-[500] text-gray-500 pt-[12px] sm:pt-[16px] text-[15px] sm:text-[20px] leading-[1.4] sm:leading-[1.2]"
                style={{wordBreak: 'keep-all'}}
            >
                모든 SaaS를 스코디에서 모으고 관리하세요.
            </p>
        </div>
    );
});
