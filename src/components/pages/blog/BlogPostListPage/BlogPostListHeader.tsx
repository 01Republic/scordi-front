import {memo} from 'react';

export const BlogPostListHeader = memo(() => {
    return (
        <div className="blog-container blog-container--default pt-[110px] sm:pt-[158px]">
            <div className="blog-container--inner">
                <h1 className="text-center font-[600] text-gray-800 leading-[1.4] text-[28px] sm:text-[44px]">
                    SaaS의 모든 것
                </h1>
                <p
                    className="text-center font-[500] text-gray-500 pt-[12px] sm:pt-[16px] text-[15px] sm:text-[20px] leading-[1.4] sm:leading-[1.2]"
                    style={{wordBreak: 'keep-all'}}
                >
                    세상 돌아가는 소식부터 내게 꼭 필요한 SaaS 정보까지 스코디피드에서 만나보세요
                </p>
            </div>
        </div>
    );
});
