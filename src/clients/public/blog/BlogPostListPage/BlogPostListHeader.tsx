import {memo} from 'react';

export const BlogPostListHeader = memo(() => {
    // return (
    //     <div className="blog-container blog-container--default pt-[80px]">
    //         <div className="blog-container--inner">
    //             <h1 className="text-center font-[600] text-gray-800 leading-[1.4] text-[28px] sm:text-[52px]">
    //                 성장하는 팀에 꼭 필요한 정보, <br />
    //                 스코디에서 만나보세요
    //             </h1>
    //             <p
    //                 className="hidden text-center font-[500] text-gray-500 pt-[12px] sm:pt-[16px] text-[15px] sm:text-[20px] leading-[1.4] sm:leading-[1.2]"
    //                 style={{wordBreak: 'keep-all'}}
    //             >
    //                 세상 돌아가는 소식부터 내게 꼭 필요한 SaaS 정보까지 스코디피드에서 만나보세요
    //             </p>
    //         </div>
    //     </div>
    // );
    return (
        <div className="blog-container blog-container--default px-4 pt-[60px] pb-[40px] sm:pt-[80px] sm:pb-[80px] text-center sm:text-left">
            <h1 className="font-[600] text-gray-800 leading-[1.4] text-[28px] sm:text-[52px]">Scordi Blog</h1>
            <p
                className="font-[500] text-gray-500 pt-[12px] sm:pt-[16px] text-[15px] sm:text-[20px] leading-[1.4] sm:leading-[1.2]"
                style={{wordBreak: 'keep-all'}}
            >
                성장하는 팀에 꼭 필요한 정보, 스코디에서 만나보세요
            </p>
        </div>
    );
});
